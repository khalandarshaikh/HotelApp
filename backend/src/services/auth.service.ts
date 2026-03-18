import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.js";

export const registerService = async (
    name: string,
    email: string,
    password: string,
    role: string = "user"
) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: role === "admin" ? "admin" : "user"
    });

    const token = generateToken(user._id.toString());

    const userPayload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    return { user: userPayload, token };
};

export const loginService = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id.toString());

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token
    };
};