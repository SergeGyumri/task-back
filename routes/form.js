import express from "express";
import FormController from "../controllers/FormController";
import checkAdmin from "../middlewares/checkAdmin";

const router = express.Router();
router.get('/get-form', FormController.getFormData);
router.post('/add-field',checkAdmin, FormController.addField);
router.delete('/delete-field',checkAdmin, FormController.deleteField);
export default router;
