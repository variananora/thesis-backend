import { first } from 'lodash';
import Commission from '../models/Commission';
import { commissionQueryWithPagination } from './queries/CommissionQuery';

export const saveCommission = async (commission) => Commission
  .create(commission);

export const deleteCommission = async (commissionId) => Commission
  .findByIdAndDelete(commissionId);

export const fetchCommissionById = async (commissionId) => Commission
  .findById(commissionId)
  .populate(['cover', 'images']);

export const fetchCommissions = async (filters, sort, searchKeyword, page, pageSize) => {
  const query = commissionQueryWithPagination(filters, sort, searchKeyword, page, pageSize);
  return first(await Commission.aggregate(query));
};

export const updateCommissionRating = async (commissionId, star) => Commission
  .findOneAndUpdate(
    { _id: commissionId },
    {
      $inc: {
        totalStars: star,
        starNumber: 1,
      },
    },
  );

export const updateCommission = async (commissionId, commission) => Commission
  .findOneAndUpdate(
    { _id: commissionId },
    commission,
  );

export const updateCommissionSales = async (commissionId) => Commission
  .findOneAndUpdate(
    { _id: commissionId },
    { $inc: { sales: 1 } },
  );
