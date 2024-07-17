import express from 'express'
import {createListing } from '../Controllers/listing.controller.js'; 
import { verifyToken } from '../utils/verifyUser.js';
import { deletelisting } from '../Controllers/listing.controller.js';
import { updateListing } from '../Controllers/listing.controller.js';
import { getListing ,getListings} from '../Controllers/listing.controller.js';

const  router = express.Router();

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',verifyToken,deletelisting)
router.post('/update/:id',verifyToken,updateListing);
router.get('/get/:id',getListing)
router.get('/get',getListings)
export default router;