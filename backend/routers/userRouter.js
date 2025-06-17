import express from "express";
import {
createUser,
getUsers,
getUserById,
updateUser,
deleteUser,
loginUser,
changePassword
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/register", createUser);
router.post("/login", loginUser);

// Protected routes
router.get("/", authenticateToken, getUsers);
router.post("/change-password", authenticateToken, changePassword);
router.get("/:id", authenticateToken, getUserById);
router.put("/:id", authenticateToken, updateUser);
router.delete("/:id", authenticateToken, deleteUser);

export default router;