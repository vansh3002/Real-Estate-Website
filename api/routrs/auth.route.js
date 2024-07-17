import express from 'express';
import { signin, signup, google,signout } from '../Controllers/auth.controller.js';

const router = express.Router()

router.post("/signup",signup);
router.post("/signin",signin);
router.post("/google", google);
router.get('/signout',signout);

export default router;
// {
// 	"name":"VSR",
// 	"description":"jadbfjk",
// 	"address":"hjdbjf",
// 	"regularPrice":73568,
// 	"discountPrice":845,
// 	"bathrooms":38,
// 	"bedrooms":32,
// 	"furnished":true,
// 	"parking":true,
// 	"type":"jdb",
// 	"offer":true,
// 	"imageUrls":["jbvfdj","ugfdbvcj"],
// 	"userRef":"jdfy8jfvjas8"
// "666d3bd1d95593a1b6391406"
// }