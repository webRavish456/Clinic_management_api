import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


dotenv.config();


cloudinary.config({
    cloud_name: "dywpuv3jk",
    api_key: "843216346619295",
    api_secret:"_pM6huf17wznJnFn0VY-Khgph3w",
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: 'doctorImage',
        resource_type: 'auto',
        allowedFormats: [
          'jpeg', 'jpg', 'png', 'gif', 'svg', 'webp', 'bmp', 'tiff', 'jfif',
          'pdf', 'docx', 'doc', 'xlsx', 'ppt', 'pptx'
        ],
        public_id: `${Date.now()}-${file.originalname}`,
      };
    },
  });
  

  const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
  }).fields([
    { name: 'image', maxCount: 1 },
  ]);
  

  const uploadDoctor = (req, res, next) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ status: 'error', message: 'File size too large. Max size is 10MB.' });
        }
        return res.status(500).json({ status: 'error', message: err.message });
      }
  
      const files = req.files;
  
      const imageUrls = {};
  
      if (files && files['resume'] && files['resume'][0]) {
        imageUrls.image = files['resume'][0].path;
      }

      if (files && files['license'] && files['license'][0]) {
        imageUrls.image = files['license'][0].path;
      }

      if (files && files['education'] && files['education'][0]) {
        imageUrls.image = files['education'][0].path;
      }

      if (files && files['pan'] && files['pan'][0]) {
        imageUrls.image = files['pan'][0].path;
      }

      if (files && files['aadhar'] && files['aadhar'][0]) {
        imageUrls.image = files['aadhar'][0].path;
      }
  
      if (Object.keys(imageUrls).length > 0) {
        req.imageUrls = imageUrls;
      }
  
      next();
    });
  };

  export default uploadDoctor