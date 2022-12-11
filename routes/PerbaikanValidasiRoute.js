import  express  from "express";
import { 
     GetValidasi, 
     GetValidasiById, 
     UpdateValidasi 
    } 
     from "../controllers/PerbaikanValidasi.js";
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/perbaikan/validasi', verifyUser, GetValidasi);
router.get('/perbaikan/validasi/:id', verifyUser, GetValidasiById);
router.patch('/perbaikan/validasi/:id', verifyUser,adminOnly, UpdateValidasi);


export default router;