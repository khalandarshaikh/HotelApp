export const validateRegister = (body: any) => {
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
        throw new Error("Name, email and password are required");
    }

    if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
    }

    if (role && !["user", "admin"].includes(role)) {
        throw new Error("Role must be user or admin");
    }
};

export const validateLogin = (body: any) => {
    const { email, password } = body;

    if (!email || !password) {
        throw new Error("Email and password are required");
    }
};