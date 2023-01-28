"use strict";
// path: ./config/env/production/database.ts
Object.defineProperty(exports, "__esModule", { value: true });
const parse = require("pg-connection-string").parse;
const config = parse(process.env.DATABASE_URL);
exports.default = ({ env }) => ({
    connection: {
        client: "postgres",
        connection: {
            host: config.host,
            port: config.port,
            database: config.database,
            user: config.user,
            password: config.password,
            ssl: {
                rejectUnauthorized: false,
            },
        },
        debug: false,
    },
});
