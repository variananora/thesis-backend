// See here https://docs.midtrans.com/reference/status-code-2xx
// for the updated list of status code from Midtrans.

export const transactionStatus = {
  200: 'PAID',
  201: 'PENDING',
  202: 'CANCELLED',
  407: 'EXPIRED',
};

export const transactionStatusConstant = (statusCode) => transactionStatus[statusCode] || 'ERROR';

export const statusFromPaymentStatus = (paymentStatus) => {
  if (paymentStatus === 'PAID' || paymentStatus === 'PENDING') {
    return 'PENDING';
  }
  if (paymentStatus === 'CANCELLED' || paymentStatus === 'EXPIRED') {
    return 'CANCELLED';
  }
  return 'ERROR';
};
