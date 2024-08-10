"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const forgotPasswordSchema = new mongoose_1.default.Schema({
    email: String,
    otp: String,
    expireAt: {
        type: Date,
        expires: 180,
        default: Date.now
    }
}, {
    timestamps: true
});
const forgotPassword = mongoose_1.default.model("forgotPassword", forgotPasswordSchema, "forgot-password");
exports.default = forgotPassword;
