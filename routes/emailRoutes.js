import { Router } from "express";
import { sendEmail } from "../controller/emailController.js";


const router = Router();
router.post("/send-email", sendEmail);

export default router;
