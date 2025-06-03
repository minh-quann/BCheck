import Role from "../models/roleModel.js";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone_number, password, role_id } = req.body;

    if (!name || !email || !phone_number || !password || !role_id) {
      return res.status(400).json({
        message:
          "Please provide all required fields: name, email, phone_number, password, and role_id.",
      });
    }

    const existingUserByEmail = await User.findOne({ where: { email } });
    if (existingUserByEmail) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    const existingUserByPhone = await User.findOne({ where: { phone_number } });
    if (existingUserByPhone) {
      return res
        .status(409)
        .json({ message: "User with this phone number already exists." });
    }

    const roleExists = await Role.findByPk(role_id);
    if (!roleExists) {
      return res
        .status(404)
        .json({ message: "The provided role_id does not exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = await User.create({
      name,
      email,
      phone_number,
      password: hashedPassword,
      role_id,
    });

    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone_number: newUser.phone_number,
      role_id: newUser.role_id,
      created_at: newUser.created_at,
      updated_at: newUser.updated_at,
    };

    res
      .status(201)
      .json({ message: "User registered successfully!", user: userResponse });
  } catch (error) {
    console.error("Error during user registration:", error);
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message });
  }
};
