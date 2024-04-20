import express from 'express'
import { isAuthenticate } from '../middlewares/authenticate.js';
import { saveImage } from '../controllers/imageController.js';

const router = express.Router();

router.post('/save',isAuthenticate, saveImage)



export default router