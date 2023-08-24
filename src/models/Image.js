import mongoose from 'mongoose';

const { Schema } = mongoose;

const ImageSchema = new Schema(
  {
    name: String,
    image: {
      data: Buffer,
      mimetype: String,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Image', ImageSchema, 'images');
