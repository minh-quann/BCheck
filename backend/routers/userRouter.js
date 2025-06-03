// routes/userRoutes.js
import express from "express";
import { registerUser } from "../controllers/userController.js"; // Assuming userController.js contains registerUser

const router = express.Router();

router.post("/register", registerUser);

export default router;
