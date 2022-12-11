import express from "express";
import { 
    getPerbaikan,
    getPerbaikanById, 
    savePerbaikan, 
    updatePerbaikan, 
    deletePerbaikan 
    } from "../controllers/Perbaikan.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/perbaikan', verifyUser, getPerbaikan);
router.get('/perbaikan/:id', verifyUser, getPerbaikanById);
router.post('/perbaikan', verifyUser, savePerbaikan);
router.patch('/perbaikan/:id', verifyUser, updatePerbaikan);
router.delete('/perbaikan/:id', verifyUser, deletePerbaikan);

export default router;
