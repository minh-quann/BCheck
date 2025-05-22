import express from "express";
import {
  getAllJobs,
  createJobWithDocuments,
  getJobById,
  deleteJob,
} from "../controllers/jobController.js";
import  upload  from "../middlewares/upload.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post(
  "/multiple-docs",
  upload.any(), 
  createJobWithDocuments
);
router.delete("/:id", deleteJob);

export default router;
