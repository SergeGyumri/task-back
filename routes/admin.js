import express from "express";
import AdminController from "../controllers/AdminController";
import checkAdmin from "../middlewares/checkAdmin";

const router = express.Router();
router.put('/block-user', checkAdmin, AdminController.blockUser);

export default router;
