import express from "express";
import {
  getAllJobs,
  checkAndComparePaymentDocument,
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

router.post(
  "/check-documents",
  upload.any(),
  checkAndComparePaymentDocument
);
router.delete("/:id", deleteJob);

export default router;
