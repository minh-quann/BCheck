var roleSchema = require('../models/role');

module.exports = {
    GetAllRole: async () => {
        return await roleSchema.findAll();
    },
    GetRoleById: async (id) => {
        return await roleSchema.findByPk(id);
    },
    GetRoleByName: async (name) => {
        return await roleSchema.findOne({
            where: { name: name }
        });
    },
    CreateRole: async (name) => {
        let newRole = roleSchema.create({
            name: name
        });
        return await newRole;
    }
}