import express from "express";
import MessagesController from "../controllers/MessagesController";

const router = express.Router();

router.get('/get-messages', MessagesController.getMessages);
router.post('/send-message', MessagesController.sendMessage);
router.delete('/delete-message/:messageId', MessagesController.deleteMessage);


export default router;
