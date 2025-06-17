import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create a new user
export const createUser = async (req, res) => {
    try {
        const { password, ...rest } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ ...rest, password: hashedPassword });
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get user by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update user
export const updateUser = async (req, res) => {
    try {
        const [updated] = await User.update(req.body, {
            where: { id: req.params.id },
        });
        if (!updated) return res.status(404).json({ error: "User not found" });
        const updatedUser = await User.findByPk(req.params.id);
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login user
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Email or password is incorrect" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, name: user.name, role_id: user.role_id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role_id: user.role_id,
                phone_number: user.phone_number,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete user
export const deleteUser = async (req, res) => {
    try {
        const deleted = await User.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).json({ error: "User not found" });
        res.json({ message: "User deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Change password
export const changePassword = async (req, res) => {
    try {
        console.log('Change password request:', {
            userId: req.user?.id,
            body: req.body
        });

        const { currentPassword, newPassword } = req.body;
        
        if (!req.user || !req.user.id) {
            console.error('No user ID in request');
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userId = req.user.id;
        const user = await User.findByPk(userId);
        if (!user) {
            console.error('User not found:', userId);
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            console.error('Current password mismatch for user:', userId);
            return res.status(400).json({ message: "Password is incorrect" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await user.update({ password: hashedPassword });
        console.log('Password updated successfully for user:', userId);

        res.json({ message: "Change password successful" });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ 
            message: "Server error", 
            error: error.message,
            details: error.stack 
        });
    }
};