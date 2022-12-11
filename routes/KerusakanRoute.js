import express from "express";
import{
    getKerusakan,
    getKerusakanById,
    saveKerusakan,
    updateKerusakan,
    deleteKerusakan
} from "../controllers/KerusakanController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/kerusakan', verifyUser, getKerusakan);
router.get('/kerusakan/:id', verifyUser, getKerusakanById);
router.post('/kerusakan', verifyUser, saveKerusakan);
router.patch('/kerusakan/:id', verifyUser, updateKerusakan);
router.delete('/kerusakan/:id', verifyUser, deleteKerusakan);

export default router;
