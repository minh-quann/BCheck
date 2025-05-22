import Job from "../models/jobModel.js";
import JobDocument from "../models/jobdocumentModel.js";


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


export const createJobWithDocuments = async (req, res) => {
  try {
    const { job_name, start_date, end_date } = req.body;

  
    const fileGroups = {};
    req.files.forEach((file) => {
      const match = file.fieldname.match(/^documents\[(\d+)\]\[(image1|image2)\]$/);
      if (!match) return;

      const index = match[1];
      const key = match[2];

      if (!fileGroups[index]) fileGroups[index] = {};
      fileGroups[index][`${key}_url`] = file.path;
    });

    const documents = Object.values(fileGroups); 

    const job = await Job.create(
      {
        job_name,
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
