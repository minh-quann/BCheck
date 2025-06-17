import Job from "../models/jobModel.js";
import JobDocument from "../models/jobdocumentModel.js";
import fetch from "node-fetch";
import FormData from 'form-data';
import fs from "fs/promises";

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: {
        model: JobDocument,
        as: "documents",
      },
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách Job", error });
  }
};

export const checkAndComparePaymentDocument = async (req, res) => {
  const results = [];
  try {
    const { job_name, start_date, end_date } = req.body;

    const fileGroups = {};

    for (const file of req.files) {
      const match = file.fieldname.match(/^documents\[(\d+)\]\[(invoice|receipt)\]$/);
      if (!match) continue;

      const index = match[1];
      const key = match[2];

      if (!fileGroups[index]) {
        fileGroups[index] = {};
      }
      fileGroups[index][key] = file;
    }

    for (const index in fileGroups) {
      const group = fileGroups[index];
      if (!group.invoice || !group.receipt) continue;

      const formData = new FormData();
      formData.append('jobName', job_name);
      formData.append('startDate', start_date);
      formData.append('endDate', end_date);

      formData.append('invoice', group.invoice.buffer, {
        filename: group.invoice.originalname,
        contentType: group.invoice.mimetype,
      });

      formData.append('receipt', group.receipt.buffer, {
        filename: group.receipt.originalname,
        contentType: group.receipt.mimetype,
      });

      const endpoint = 'https://bchecktrial.app.n8n.cloud/webhook/upload';
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: formData.getHeaders(),
        })
        const data = await response.json();
        results.push({
          index,
          status: data.status,
          message: data.message,
        });

        console.log(`Sent document ${index} successfully`);
      } catch (error) {
        results.push({
          index,
          status: false,
          message: error.message || 'Unknown error',
        });
        console.error(`Error sending document ${index}:`, error.message);
      }
    }

    res.json({
      success: true,
      data: results,
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};


export const createJobWithDocuments = async (req, res) => {
  try {
    const { job_name, start_date, end_date, job_description } = req.body;

    const fileGroups = {};
    req.files.forEach((file) => {
      const match = file.fieldname.match(/^documents\[(\d+)\]\[(invoice|receipt)\]$/);
      if (!match) return;

      const index = match[1];
      const key = match[2];

      if (!fileGroups[index])
        fileGroups[index] = {};

      fileGroups[index][`${key}_url`] = file.path;
      
    });

    if (Array.isArray(req.body.documents)) {
      req.body.documents.forEach((doc, index) => {
        if (!fileGroups[index]) fileGroups[index] = {};
        if (doc.result) fileGroups[index].result = doc.result;
      });
    }

    const documents = Object.values(fileGroups);


    const job = await Job.create(
      {
        job_name,
        job_description,
        start_date,
        end_date,
        documents,
      },
      {
        include: [{ model: JobDocument, as: "documents" }],
      }
    );

    res.status(201).json(job);

  } catch (error) {
    console.error("Lỗi tạo job:", error);
    res.status(500).json({ message: "Lỗi khi tạo Job", error });
  }
};



export const getJobById = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id, {
      include: { model: JobDocument, as: "documents" },
    });

    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy Job" });
    }

    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy Job", error });
  }
};


export const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Không tìm thấy Job" });
    }
    await job.destroy();
    res.status(200).json({ message: "Đã xoá Job và các chứng từ liên quan" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xoá Job", error });
  }
};
