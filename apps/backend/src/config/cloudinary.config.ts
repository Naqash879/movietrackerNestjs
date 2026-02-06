import { v2 as cloudinary } from 'cloudinary';

const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

//console.log(CLOUDINARY_NAME);
cloudinary.config({
  cloud_name: String(CLOUDINARY_NAME),
  api_key: String(CLOUDINARY_API_KEY),
  api_secret: String(CLOUDINARY_API_SECRET),
});

export default cloudinary;
