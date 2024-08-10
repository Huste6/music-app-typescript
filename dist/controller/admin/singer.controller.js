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
exports.detail = exports.editPOST = exports.edit = exports.deletePOST = exports.changeSatus = exports.createPost = exports.create = exports.index = void 0;
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const singers = yield singer_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/singers/index", {
        pageTitle: "Quản lý ca sỹ",
        singers: singers
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("admin/pages/singers/create", {
        pageTitle: "Tạo mới ca sỹ"
    });
});
exports.create = create;
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newSinger = new singer_model_1.default(req.body);
    newSinger.save();
    res.redirect(`${config_1.systemConfig.prefixAdmin}/singers`);
});
exports.createPost = createPost;
const changeSatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.DataStatus;
    const singerid = req.params.DataID;
    yield singer_model_1.default.updateOne({
        _id: singerid
    }, {
        status: status
    });
    res.json({
        code: 200,
        message: "Success"
    });
});
exports.changeSatus = changeSatus;
const deletePOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSinger = req.params.dataId;
    yield singer_model_1.default.updateOne({
        _id: idSinger
    }, {
        deleted: true
    });
    res.json({
        code: 200,
        message: "Success!"
    });
});
exports.deletePOST = deletePOST;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSinger = req.params.idSinger;
    const singer = yield singer_model_1.default.findOne({
        _id: idSinger
    });
    res.render("admin/pages/singers/edit", {
        pageTitle: "Chỉnh sửa thông tin ca sỹ",
        singer: singer
    });
});
exports.edit = edit;
const editPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSinger = req.params.idSinger;
    const ExistSinger = yield singer_model_1.default.findOne({
        _id: idSinger
    });
    if (ExistSinger) {
        yield singer_model_1.default.updateOne({
            _id: idSinger
        }, req.body);
        req["flash"]("success", "Cập nhật thành công!");
    }
    res.redirect("back");
});
exports.editPOST = editPOST;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSinger = req.params.idSinger;
    const singer = yield singer_model_1.default.findOne({
        _id: idSinger
    });
    res.render("admin/pages/singers/detail", {
        pageTitle: "Thông tin về ca sỹ",
        singer: singer
    });
});
exports.detail = detail;
