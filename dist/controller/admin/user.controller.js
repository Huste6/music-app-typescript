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
exports.detail = exports.deletePost = exports.changeStatus = exports.index = void 0;
const user_model_1 = __importDefault(require("../../model/user.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.default.find({
        deleted: false
    }).select("-password -tokenUser");
    res.render("admin/pages/user/index", {
        pageTitle: "Tài khoản admin",
        users: users
    });
});
exports.index = index;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.DataStatus;
    const idUser = req.params.DataID;
    yield user_model_1.default.updateOne({
        _id: idUser
    }, {
        status: status
    });
    res.json({
        code: 200,
        message: "Thành công!",
        status: status
    });
});
exports.changeStatus = changeStatus;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataId = req.params.dataId;
    try {
        const user = yield user_model_1.default.findOne({ _id: dataId });
        if (!user) {
            req["flash"]("error", "Không tìm thấy người dùng!");
            return res.redirect("back");
        }
        yield user_model_1.default.updateOne({ _id: dataId }, { deleted: true });
        req["flash"]("success", "Xóa thành công người dùng!");
        return res.json({
            code: 200,
            message: "Success!"
        });
    }
    catch (error) {
        console.error("Error:", error);
        req["flash"]("error", "Có lỗi xảy ra!");
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
});
exports.deletePost = deletePost;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idAccountuser = req.params.idUser;
    const user = yield user_model_1.default.findOne({
        _id: idAccountuser
    });
    if (!user) {
        req["flash"]("error", "Không tìm thấy tài khoản người dùng!");
        return res.redirect("back");
    }
    res.render("admin/pages/user/detail", {
        pageTitle: "Chi tiết tài khoản user",
        user: user
    });
});
exports.detail = detail;
