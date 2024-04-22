import express from 'express'
import { isAuthenticate } from '../middlewares/authenticate.js';
import { getAllImages, saveImage } from '../controllers/imageController.js';

const router = express.Router();

router.post('/save',isAuthenticate, saveImage);
router.get('/all',isAuthenticate, getAllImages);



export default router