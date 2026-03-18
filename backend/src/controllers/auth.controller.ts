import type { Request, Response } from "express";
import { registerService, loginService } from "../services/auth.service.js";
import User from "../models/user.model.js";
import { validateRegister } from "../validators/auth.validator.js";
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        const data = await registerService(name, email, password, role);

        res.status(201).json({
            success: true,
            data
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const data = await loginService(email, password);

        res.status(200).json({
            success: true,
            data
        });
    } catch (error: any) {
        res.status(401).json({
            success: false,
            message: error.message
        });
    }
};

export const getCurrentUser = async (req: any, res: Response) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        res.json({
            success: true,
            user
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};