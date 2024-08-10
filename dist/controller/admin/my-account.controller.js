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
exports.editPatch = exports.edit = exports.index = void 0;
const account_admin_model_1 = __importDefault(require("../../model/account-admin.model"));
const md5_1 = __importDefault(require("md5"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/my-account/index", {
        pageTitle: "Tài khoản admin"
    });
});
exports.index = index;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/my-account/edit", {
        pageTitle: "Chỉnh sửa thông tin cá nhân"
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const emailExist = yield account_admin_model_1.default.findOne({
        _id: { $ne: res.locals.user.id },
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
        yield account_admin_model_1.default.updateOne({ _id: res.locals.user.id }, req.body);
        req["flash"]("success", "Cập nhật thành công");
    }
    res.redirect("back");
});
exports.editPatch = editPatch;
