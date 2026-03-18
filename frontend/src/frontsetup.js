const fs = require("fs");
const path = require("path");

const structure = {
    api: { api: ["auth.api.ts"] },

    page: {
        pages: [
            "Login.tsx",
            "Register.tsx"
        ]
    },

    components: {
        components: [
            "AuthForm.tsx"
        ]
    },

    context: {
        context: [
            "AuthContext.tsx"
        ]
    },

    routes: {
        routes: [
            "AppRoutes.tsx"
        ]
    },

    rootFiles: {
        rootFiles: [
            "App.tsx",
            "main.tsx",
            "styles.css"
        ]
    }
};

function createStructure(base, obj) {
    for (const key in obj) {

        const currentPath = path.join(base, key);

        if (Array.isArray(obj[key])) {

            fs.mkdirSync(base, { recursive: true });

            obj[key].forEach((file) => {
                const filePath = path.join(base, file);
                fs.writeFileSync(filePath, "");
            });

        } else {

            fs.mkdirSync(currentPath, { recursive: true });
            createStructure(currentPath, obj[key]);

        }
    }
}

createStructure(".", structure);

console.log("Frontend project structure created successfully 🚀");