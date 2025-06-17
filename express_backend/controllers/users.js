var userSchema = require('../models/user');
var roleController = require('../controllers/roles');
const { associate } = require('../models/role');
let bcrypt = require('bcrypt');

module.exports = {
    GetAllUser: async () => {
        return await userSchema.findAll({
            include: [{ association: 'roles' }],
        });
    },
    GetUserById: async (id) => {
        return await userSchema.findByPk(id, {
            include: [{ association: 'roles' }],
        });
    },
    GetUserByEmail: async (email) => {
        return await userSchema.findOne({
            where: { email: email },
            include: [{ association: 'roles' }],
        });
    },
    GetUserByToken: async (token) => {
        return await userSchema.findOne({
            where: { tokenResetPassword: token },
        });
    },
    CreateAnUser: async (name, email, phone_number, password, role) => {
        let getRole = await roleController.GetRoleByName(role);
        if (getRole) {
            newUser = await userSchema.create({
                name: name,
                email: email,
                phone_number: phone_number,
                password: password,
                role_id: getRole.id
            })
            return await newUser;
        } else {
            throw new Error("Role not found");
        }
    },
    UpdateUser: async function (id, body) {
        let allowFields = ["name", "password", "email", "phone_number"];
        let user = await userSchema.findByPk(id);
        if (user) {
            for (const key of Object.keys(body)) {
                if (allowFields.includes(key)) {
                    user[key] = body[key]
                }
            }
            return await user.save();
        }
    },
    DeleteUser: async function (id) {
        let user = await userSchema.findByPk(id);
        if (user) {
            user.isDelete = true;
            return await user.save();
        }
    },
    Login: async function (email, password){
        let user = await userSchema.findOne({
            where: { email: email },
        })
        if(!user){
            throw new Error("Email not found");
        }else{
            if(bcrypt.compareSync(password,user.password)){
                return user;
            }else{
                throw new Error("Incorrect password");
            }
        }
    }
}