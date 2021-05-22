import express from 'express';
import path from 'path';
import asyncHandler from "express-async-handler";
import multer from 'multer';
import pkg from 'cloudinary';
const router = express.Router();
const cloudinary = pkg;

import { protect } from '../middleware/authMiddleware.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    // getting one file, making sure it can be a duplicate with the Date.now(). 
    // And making sure it will keep its extension name with path.extname. 
    // will include the dot after the file name
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

function checkFileType(file, cb) {
  // file types that are being accepted
  const filetypes = /jpg|jpeg|png/; 
  // const extname is different from path.extname. const extname is just a variable created
  // testing against the filetype variable. If it matches, it will be true, if not it'll be false
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); 
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images Only');
  };
};

const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb)
  }
})

router.post('/', protect, upload.single('image'), asyncHandler (async (req, res) => {
  const uploadPhoto = await cloudinary.v2.uploader.upload(`${req.file.path}`);
  console.log(uploadPhoto); // This will give you all the information back from the uploaded photo result
  console.log(uploadPhoto.url);  // This is what we want to send back now in the  res.send
  res.send(uploadPhoto.url); 
}));

export default router;