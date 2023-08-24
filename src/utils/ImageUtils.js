import fs from 'fs';

// image model wrapper
const generateImageData = (file) => ({
  name: file.originalname,
  image: {
    data: fs.readFileSync(`uploads/${file.filename}`),
    mimetype: file.mimetype,
  },
});

export default generateImageData;
