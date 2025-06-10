import JobDocument from "../models/jobdocumentModel.js";


export const getAllDocs = async (req, res) => {
    try {
        const docs = await JobDocument.findAll({});
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách Công việc", error });
    }
};

export const getDocById = async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await JobDocument.findByPk(id)
        if (!doc) {
            return res.status(404).json({ message: "Không tìm thấy tài liệu" });
        }
        res.status(200).json(doc);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy tài liệu", error });
    }
};

export const getAllDocsByJobId = async (req, res) => {
    const { jobId } = req.params;
    try {
        const docs = await JobDocument.findAll({
            where: { job_id: jobId }
        });
        if (!docs || docs.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy tài liệu cho Công việc này" });
        }
        res.status(200).json(docs);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy tài liệu", error });
    }
};


