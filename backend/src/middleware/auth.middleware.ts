import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = (
    req: any,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        const decoded: any = verifyToken(token);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        });
    }
};

export default authMiddleware;