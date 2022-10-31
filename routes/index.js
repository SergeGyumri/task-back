import express from "express";
import form from "./form";
import users from "./users";
import messages from "./messages";

const router = express.Router();

/* GET home page. */
router.use('/form', form);
router.use('/users', users);
router.use('/messages', messages);

export default router;
