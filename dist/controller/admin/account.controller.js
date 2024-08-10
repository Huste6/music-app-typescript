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
exports.detail = exports.deletePost = exports.editPatch = exports.edit = exports.changeStatus = exports.createPost = exports.create = exports.index = void 0;
const account_admin_model_1 = __importDefault(require("../../model/account-admin.model"));
const role_model_1 = __importDefault(require("../../model/role.model"));
const config_1 = require("../../config/config");
const md5_1 = __importDefault(require("md5"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accounts = yield account_admin_model_1.default.find({
        deleted: false
    }).select("-password -token");
    for (const item of accounts) {
        const role = yield role_model_1.default.findOne({ _id: item.role_id });
        item["role_title"] = role.title;
    }
    res.render("admin/pages/accounts/index", {
        pageTitle: "Tài khoản admin",
        accounts: accounts
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const role = yield role_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/accounts/create", {
        pageTitle: "Tạo tài khoản",
        role: role
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield account_admin_model_1.default.findOne({
        email: req.body.email,
        deleted: false,
    });
    if (emailExist) {
        req["flash"]("error", "Email này đã tồn tại");
        res.redirect("back");
    }
    else {
        req.body.password = (0, md5_1.default)(req.body.password);
        const record = new account_admin_model_1.default(req.body);
        yield record.save();
        res.redirect(`${config_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.createPost = createPost;
const changeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.DataStatus;
    const idAccount = req.params.DataID;
    yield account_admin_model_1.default.updateOne({
        _id: idAccount
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
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield account_admin_model_1.default.findOne({
            _id: req.params.id,
            deleted: false
        });
        const role = yield role_model_1.default.find({ deleted: false });
        res.render("admin/pages/accounts/edit", {
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            role: role
        });
    }
    catch (error) {
        res.redirect(`${config_1.systemConfig.prefixAdmin}/accounts`);
    }
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const emailExist = yield account_admin_model_1.default.findOne({
            _id: { $ne: req.params.id },
            email: req.body.email,
            deleted: false,
        });
        if (emailExist) {
            req["flash"]("error", "Email này đã tồn tại");
        }
        else {
            if (req.body.password) {
                req.body.password = (0, md5_1.default)(req.body.password);
            }
            else {
                delete req.body.password;
            }
            yield account_admin_model_1.default.updateOne({ _id: req.params.id }, req.body);
            req["flash"]("success", "Cập nhật thành công");
        }
        res.redirect("back");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});
exports.editPatch = editPatch;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dataId = req.params.dataId;
    try {
        const account = yield account_admin_model_1.default.findOne({ _id: dataId });
        if (!account) {
            req["flash"]("error", "Không tìm thấy bài hát!");
            return res.redirect("back");
        }
        yield account_admin_model_1.default.updateOne({ _id: dataId }, { deleted: true });
        req["flash"]("success", "Xóa thành công bài hát!");
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
    const idAccountAdmin = req.params.idAccount;
    const ExistAccount = yield account_admin_model_1.default.findOne({
        _id: idAccountAdmin
    });
    if (!ExistAccount) {
        req["flash"]("error", "Không tìm thấy tài khoản admin!");
        return res.redirect("back");
    }
    const role = yield role_model_1.default.findOne({
        _id: ExistAccount.role_id
    }).select("title permissions");
    res.render("admin/pages/accounts/detail", {
        pageTitle: "Chi tiết tài khoản admin",
        ExistAccount: ExistAccount,
        role: role
    });
});
exports.detail = detail;
