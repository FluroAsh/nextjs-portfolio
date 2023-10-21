"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    connection: {
        client: "postgres",
        connection: {
            host: env("DATABASE_HOST", "localhost"),
            port: env.int("DATABASE_PORT", 5432),
            database: env("DATABASE_NAME", "strapi_blog"),
            user: env("DATABASE_USERNAME", "postgres"),
            password: env("DATABASE_PASSWORD", "0000"),
            ssl: false,
            debug: false,
        },
    },
});
