import express from "express";
import FormController from "../controllers/FormController";

const router = express.Router();
router.get('/get-form', FormController.getFormData);

export default router;
