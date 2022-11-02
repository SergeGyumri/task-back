import express from "express";
import AdminController from "../controllers/AdminController";
import FormController from "../controllers/FormController";

const router = express.Router();
router.post('/login', AdminController.loginAdmin);
router.get('/block-user', AdminController.blockUser);
router.delete('/delete-message', AdminController.deleteMessage);
router.post('/add-field', FormController.addField);
router.delete('/delete-field', FormController.deleteField);


export default router;
