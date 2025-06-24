var express = require('express');
var router = express.Router();
let JobController = require('../controllers/jobs');
let { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler')
let constant = require('../utils/constants');
let { check_authentication, check_authorization } = require('../utils/CheckAuth');


router.post('/', check_authentication, async function (req, res, next) {
  try {
    let body = req.body
    let newJob = await JobController.CreateJob(body.job_name, body.job_description, body.start_date, body.end_date, req.user.id);
    CreateSuccessRes(res, 200, newJob);
  } catch (error) {
    next(error);
  }
});

module.exports = router;