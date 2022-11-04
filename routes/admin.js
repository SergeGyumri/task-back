import express from "express";
import AdminController from "../controllers/AdminController";

const router = express.Router();
router.get('/block-user', AdminController.blockUser);
router.delete('/delete-message', AdminController.deleteMessage);



export default router;
