import multer from 'multer';

/**
 * Initialize multer storage engine
 */
const storageEngine = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

/**
 * Initialize multer upload
 */
const multerUploader = multer({
  storage: storageEngine,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default multerUploader;
