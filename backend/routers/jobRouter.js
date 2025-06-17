import express from "express";
import {
  getAllJobs,
  checkAndComparePaymentDocument,
  createJobWithDocuments,
  getJobById,
  deleteJob,
} from "../controllers/jobController.js";
import  upload  from "../middlewares/upload.js";
import  save  from "../middlewares/save.js";

const router = express.Router();

router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.post(
  "/save-documents",
  save.any(),
  createJobWithDocuments
);

router.post(
  "/check-documents",
  upload.any(),
  checkAndComparePaymentDocument
);
router.delete("/:id", deleteJob);

export default router;
