var jobSchema = require('../models/job');
var userSchema = require('../models/user');

module.exports = {
    GetAllJob: async () => {
        return await jobSchema.findAll();
    },
    GetJobById: async (id) => {
        return await roleSchema.findByPk(id);
    },
    GetJobByEmployeeName: async (employeeName) => {
        let GetUser = await userSchema.findOne({
            where: { name: employeeName }
        });
        return await jobSchema.findOne({
            where: { user_id: GetUser.id }
        });
    },
    CreateJob: async (job_name, job_description, start_date, end_date, user_id) => {
        let newJob = jobSchema.create({
            job_name: job_name,
            job_description: job_description,
            start_date: start_date,
            end_date: end_date,
            status: "pending",
            user_id: user_id
        });
        return await newJob;
    }
}