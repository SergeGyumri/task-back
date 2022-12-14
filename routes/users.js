import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();

router.post('/register', UsersController.register);
router.post('/login', UsersController.login);
router.post('/go-to-chat', UsersController.goToChat);
router.delete('/log-out-chat', UsersController.logOutChat);
router.get('/my-account', UsersController.myAccount);


export default router;
