import express from "express";
import {
    getDataSekolah,
    getDataSekolahById,
    createDataSekolah,
    updateDataSekolah,
    deleteDataSekolah
} from "../controllers/DataSekolah.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/datasekolah', verifyUser, getDataSekolah);
router.get('/datasekolah/:id', verifyUser, getDataSekolahById);
router.post('/datasekolah', verifyUser, createDataSekolah);
router.patch('/datasekolah/:id', verifyUser, updateDataSekolah);
router.delete('/datasekolah/:id', verifyUser, deleteDataSekolah);

export default router;