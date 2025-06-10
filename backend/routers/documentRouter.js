import express from "express";
import { 
    getAllDocs,
    getDocById,
    getAllDocsByJobId   
} from "../controllers/documentController.js";

const router = express.Router();

router.get("/", getAllDocs);
router.get("/:id", getDocById);
router.get("/job/:jobId", getAllDocsByJobId);

export default router;