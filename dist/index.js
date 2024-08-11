"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 4401;
app.get('/', (req, res) => {
    res.send('Hi there');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
