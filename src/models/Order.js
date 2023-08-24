import mongoose from 'mongoose';

const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    commissionId: {
      type: Schema.Types.ObjectId,
      ref: 'Commission',
      required: true,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'IN_PROGRESS', 'FINISHING', 'REVISION', 'COMPLETED', 'CANCELLED', 'ERROR'],
      default: 'PENDING',
    },
    paymentStatus: {
      type: String,
      enum: ['UNPAID', 'PAID', 'PENDING', 'CANCELLED', 'EXPIRED', 'ERROR'],
      default: 'UNPAID',
    },
    token: String,
    revision: {
      type: Number,
      default: 0,
    },
    maxRevision: Number,
    reviewId: {
      type: Schema.Types.ObjectId,
      ref: 'Review',
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Order', OrderSchema, 'orders');
