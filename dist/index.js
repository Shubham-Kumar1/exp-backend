"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./db/index");
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config({
    path: './.env'
});
const PORT = process.env.PORT;
(0, index_1.connectDB)()
    .then(() => {
    app_1.default.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.log('Failed to connect to the database:', err);
});
