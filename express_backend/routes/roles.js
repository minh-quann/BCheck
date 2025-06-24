var express = require('express');
var router = express.Router();
let RoleController = require('../controllers/roles');
let { CreateSuccessRes, CreateErrorRes } = require('../utils/ResHandler')

router.get('/', async function (req, res, next) {
  let users = await RoleController.GetAllRole();
  CreateSuccessRes(res, 200, users);
});

router.get('/:id', async function (req, res, next) {
  try {
    let user = await RoleController.GetRoleById(req.params.id)
    CreateSuccessRes(res, 200, user);
  } catch (error) {
    next(error);
  }
});

router.post('/', async function (req, res, next) {
  try {
    let newRole = await RoleController.CreateRole(req.body.name);
    CreateSuccessRes(res, 200, newRole);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    let updateRole = await RoleController.UpdateRole(req.params.id, req.body);
    CreateSuccessRes(res, 200, updateRole);
  }
  catch (error) {
    next(error);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    let deleteRole = await RoleController.DeleteRole(req.params.id);
    CreateSuccessRes(res, 200, deleteRole);
  }
  catch (error) {
    next(error);
  }
});

module.exports = router;