import mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: String,
    image: {
      type: Schema.Types.ObjectId,
      ref: 'Image',
    },
    description: String,
    isCreator: {
      type: Boolean,
      default: false,
    },
    bankDetails: {
      bankCode: String,
      accountNumber: String,
      accountHolderName: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', UserSchema, 'users');
