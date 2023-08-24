export const sorterQuery = (sorter) => {
  // sort documents based on sorter
  if (!sorter) {
    // default sort by createdAt desc
    return [{ $sort: { createdAt: -1 } }];
  }

  const order = sorter?.order === 'asc' ? 1 : -1;
  return [{ $sort: { [sorter?.name]: order } }];
};

export const searchQuery = (searchKeyword, keys) => {
  // search documents based on searchKeyword
  if (!searchKeyword) {
    return [];
  }

  // escape regex special characters
  const searchRegex = searchKeyword.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
  return [
    {
      $match: {
        $or: keys.map((key) => ({
          [key]: {
            $regex: searchRegex,
            $options: 'i',
          },
        })),
      },
    },
  ];
};

export const paginationQuery = (page = 1, pageSize = 10) => {
  // paginate documents based on page and pageSize
  const skip = (+page - 1) * +pageSize;
  return [
    {
      $facet: {
        // get total data
        totalData: [
          { $count: 'total' },
        ],
        // get data
        data: [
          { $skip: skip },
          { $limit: +pageSize },
        ],
      },
    },
    // format total data
    {
      $addFields: {
        totalData: {
          $ifNull: [{ $arrayElemAt: ['$totalData.total', 0] }, 0],
        },
      },
    },
  ];
};
