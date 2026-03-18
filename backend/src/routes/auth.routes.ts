import express from "express";
import {
    registerUser,
    loginUser,
    getCurrentUser
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * @route POST /api/auth/register
 * @desc Register new user
 */
router.post("/register", registerUser);

/**
 * @route POST /api/auth/login
 * @desc Login user
 */
router.post("/login", loginUser);

/**
 * @route GET /api/auth/me
 * @desc Get logged in user
 * @protected
 */
router.get("/me", authMiddleware, getCurrentUser);

export default router;