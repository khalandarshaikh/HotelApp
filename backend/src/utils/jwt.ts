import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
    const secret = process.env.JWT_SECRET as string;

    const token = jwt.sign({ id: userId }, secret, {
        expiresIn: "7d"
    });

    return token;
};

export const verifyToken = (token: string) => {
    const secret = process.env.JWT_SECRET as string;
    return jwt.verify(token, secret);
};