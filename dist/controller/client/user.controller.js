"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoPATCH = exports.info = exports.resetPost = exports.reset = exports.otpPasswordPost = exports.otpPassword = exports.forgotPasswordPost = exports.forgotPassword = exports.logout = exports.loginPost = exports.login = exports.registerPost = exports.register = void 0;
const md5_1 = __importDefault(require("md5"));
const user_model_1 = __importDefault(require("../../model/user.model"));
const generate_1 = require("../../helpers/generate");
const forgot_password_model_1 = __importDefault(require("../../model/forgot-password.model"));
const sendMail_1 = require("../../helpers/sendMail");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng ký tài khoản"
    });
});
exports.register = register;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.password = (0, md5_1.default)(req.body.password);
        const ExistEmail = yield user_model_1.default.findOne({
            email: req.body.email
        });
        if (ExistEmail) {
            req["flash"]("error", "Đã tồn tại email!");
            return res.redirect("back");
        }
        const ExistPassword = yield user_model_1.default.findOne({
            password: req.body.password
        });
        if (ExistPassword) {
            req["flash"]("error", "Đã tồn tại password!");
            return res.redirect("back");
        }
        const user = new user_model_1.default(req.body);
        yield user.save();
        res.cookie("tokenUser", user.tokenUser);
        res.redirect("/topics");
    }
    catch (error) {
        req["flash"]("error", "Đã xảy ra lỗi!");
        return res.redirect("back");
    }
});
exports.registerPost = registerPost;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập"
    });
});
exports.login = login;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        const password = (0, md5_1.default)(req.body.password);
        const user = yield user_model_1.default.findOne({
            email: email,
            deleted: false
        });
        if (!user) {
            req["flash"]("error", "Không tồn tại email!");
            return res.redirect("back");
        }
        if (user.password !== password) {
            req["flash"]("error", "Sai mật khẩu!");
            return res.redirect("back");
        }
        if (user.status === "inactive") {
            req["flash"]("error", "Tài khoản đang bị khóa!");
            return res.redirect("back");
        }
        res.cookie("tokenUser", user.tokenUser);
        res.redirect("/topics");
    }
    catch (error) {
        console.error(error);
        req["flash"]("error", "Đã xảy ra lỗi!");
        return res.redirect("back");
    }
});
exports.loginPost = loginPost;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("tokenUser");
    res.redirect("/topics");
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/forgotPassword", {
        pageTitle: "Lấy lại mật khẩu"
    });
});
exports.forgotPassword = forgotPassword;
const forgotPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const user = yield user_model_1.default.findOne({
        email: email,
        deleted: false
    });
    if (!user) {
        req["flash"]("error", "Không tồn tại email!");
        return res.redirect("back");
    }
    const otp = (0, generate_1.generateRandomNumber)(8);
    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    };
    const forgot = new forgot_password_model_1.default(objectForgotPassword);
    yield forgot.save();
    const subject = "Mã OTP xác minh lấy lại mật khẩu: ";
    const html = `
        Mã OTP để lấy lại mật khẩu là <b>${otp}</b> Thời hạn sử dụng 3 phút
    `;
    (0, sendMail_1.sendMail)(email, subject, html);
    res.redirect(`/user/password/otp?email=${email}`);
});
exports.forgotPasswordPost = forgotPasswordPost;
const otpPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    res.render("client/pages/user/otp-password", {
        pageTitle: "Nhập mã OTP",
        email: email,
    });
});
exports.otpPassword = otpPassword;
const otpPasswordPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const otp = req.body.otp;
    const result = yield forgot_password_model_1.default.findOne({
        email: email,
        otp: otp
    });
    if (!result) {
        req["flash"]("error", "OTP không hợp lệ!");
        res.redirect("back");
        return;
    }
    const user = yield user_model_1.default.findOne({
        email: email
    });
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/user/password/reset");
});
exports.otpPasswordPost = otpPasswordPost;
const reset = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu"
    });
});
exports.reset = reset;
const resetPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = (0, md5_1.default)(req.body.password);
    const confirmPassword = req.body.confirmPassword;
    const tokenUser = req.cookies.tokenUser;
    const user = yield user_model_1.default.findOne({
        tokenUser: tokenUser
    });
    if (user.password === password) {
        req["flash"]("error", "Mật khẩu mới phải khác mật khẩu cũ!");
        res.redirect("back");
        return;
    }
    const ExistPassword = yield user_model_1.default.findOne({
        password: password
    });
    if (ExistPassword) {
        req["flash"]("error", "Đã tồn tại password!");
        return res.redirect("back");
    }
    yield user_model_1.default.updateOne({
        tokenUser: tokenUser
    }, {
        password: password
    });
    req["flash"]("success", "Đổi mật khẩu thành công");
    res.redirect("/topics");
});
exports.resetPost = resetPost;
const info = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("client/pages/user/info", {
        pageTitle: "Thông tin tài khoản"
    });
});
exports.info = info;
const infoPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenUser = req.cookies.tokenUser;
    const dataUSer = {
        fullname: req.body.fullname,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
    };
    if (req.body.avatar) {
        dataUSer["avatar"] = req.body.avatar;
    }
    yield user_model_1.default.updateOne({
        tokenUser: tokenUser
    }, dataUSer);
    res.redirect("back");
});
exports.infoPATCH = infoPATCH;
