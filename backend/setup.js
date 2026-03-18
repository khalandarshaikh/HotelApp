const fs = require("fs");
const path = require("path");

const structure = {
    src: {
        config: { config: ["db.ts", "redis.ts"] },
        controllers: {
            controllers: [
                "auth.controller.ts",
                "hotel.controller.ts",
                "booking.controller.ts"
            ]
        },
        services: {
            services: [
                "auth.service.ts",
                "hotel.service.ts",
                "booking.service.ts"
            ]
        },
        models: {
            models: [
                "user.model.ts",
                "hotel.model.ts",
                "room.model.ts",
                "booking.model.ts"
            ]
        },
        routes: {
            routes: [
                "auth.routes.ts",
                "hotel.routes.ts",
                "booking.routes.ts"
            ]
        },
        middleware: {
            middleware: [
                "auth.middleware.ts",
                "error.middleware.ts"
            ]
        },
        validators: { validators: ["auth.validator.ts"] },
        utils: { utils: ["jwt.ts"] },
        rootFiles: { rootFiles: ["server.ts"] }
    }
}
    ;

function createStructure(base, obj) {
    for (const key in obj) {
        const currentPath = path.join(base, key);

        if (Array.isArray(obj[key])) {
            fs.mkdirSync(base, { recursive: true });
            obj[key].forEach(file => {
                fs.writeFileSync(path.join(base, file), "");
            });
        } else {
            fs.mkdirSync(currentPath, { recursive: true });
            createStructure(currentPath, obj[key]);
        }
    }
}

createStructure(".", structure);

console.log("Project structure created successfully 🚀");