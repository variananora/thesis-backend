// lookup user data without password
// eslint-disable-next-line import/prefer-default-export
export const userLookupQuery = (field) => [
  {
    $lookup: {
      from: 'users',
      localField: field,
      foreignField: '_id',
      as: field,
    },
  },
  {
    $unwind: {
      path: `$${field}`,
    },
  },
  {
    $project: {
      [`${field}.password`]: 0,
    },
  },
  {
    $lookup: {
      from: 'images',
      localField: `${field}.image`,
      foreignField: '_id',
      as: `${field}.image`,
    },
  },
  {
    $unwind: {
      path: `$${field}.image`,
      preserveNullAndEmptyArrays: true,
    },
  },
];
