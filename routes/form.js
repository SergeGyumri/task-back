import express from "express";
import FormController from "../controllers/FormController";

const router = express.Router();
router.get('/get-form', FormController.getFormData);
router.post('/add-field', FormController.addField);
router.delete('/delete-field', FormController.deleteField);


export default router;
