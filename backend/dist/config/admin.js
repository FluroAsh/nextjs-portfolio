"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ env }) => ({
    auth: {
        secret: env("JWT_SECRET"),
    },
    apiToken: {
        salt: env("API_TOKEN_SALT"),
    },
});
