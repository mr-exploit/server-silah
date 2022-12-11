import  express  from "express";
import { 
     GetValidasi, 
     GetValidasiById, 
     UpdateValidasi 
    } 
     from "../controllers/KerusakanValidasiControl.js";
import { verifyUser,adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/validasi', verifyUser, GetValidasi);
router.get('/validasi/:id', verifyUser, GetValidasiById);
router.patch('/validasi/:id', verifyUser,adminOnly, UpdateValidasi);


export default router;