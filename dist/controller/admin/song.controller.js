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
exports.deletePOST = exports.detail = exports.ChangeStatus = exports.editPatch = exports.edit = exports.createPOST = exports.create = exports.index = void 0;
const song_model_1 = __importDefault(require("../../model/song.model"));
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const config_1 = require("../../config/config");
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const songs = yield song_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/songs/index", {
        pageTitle: "Quản lý bài hát",
        songs: songs
    });
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("id title");
    const singers = yield singer_model_1.default.find({
        deleted: false,
        status: "active"
    }).select("id fullName");
    res.render("admin/pages/songs/create", {
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers
    });
});
exports.create = create;
const createPOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let avatar = "";
    let audio = "";
    if (req.body.avatar) {
        avatar = req.body.avatar[0];
    }
    if (req.body.audio) {
        audio = req.body.audio[0];
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        lyrics: req.body.lyrics,
        status: req.body.status,
        avatar: avatar,
        audio: audio
    };
    const song = new song_model_1.default(dataSong);
    yield song.save();
    res.redirect(`${config_1.systemConfig.prefixAdmin}/songs`);
});
exports.createPOST = createPOST;
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        deleted: false
    });
    const topics = yield topic_model_1.default.find({
        deleted: false
    }).select("title");
    const singers = yield singer_model_1.default.find({
        deleted: false
    }).select("fullName");
    res.render("admin/pages/songs/edit", {
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics: topics,
        singers: singers
    });
});
exports.edit = edit;
const editPatch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idSong = req.params.idSong;
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        lyrics: req.body.lyrics,
        status: req.body.status
    };
    if (req.body.avatar) {
        dataSong["avatar"] = req.body.avatar[0];
    }
    if (req.body.audio) {
        dataSong["audio"] = req.body.audio[0];
    }
    yield song_model_1.default.updateOne({
        _id: idSong
    }, dataSong);
    res.redirect("back");
});
exports.editPatch = editPatch;
const ChangeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.DataStatus;
    const idSong = req.params.DataID;
    yield song_model_1.default.updateOne({
        _id: idSong
    }, {
        status: status
    });
    res.json({
        code: 200,
        message: "Thành công!",
        status: status
    });
});
exports.ChangeStatus = ChangeStatus;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IDSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: IDSong
    });
    res.render("admin/pages/songs/detail", {
        pageTitle: "Chi tiết bài hát",
        song: song
    });
});
exports.detail = detail;
const deletePOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const IDSONG = req.params.idSong;
    try {
        const song = yield song_model_1.default.findOne({ _id: IDSONG });
        if (!song) {
            req["flash"]("error", "Không tìm thấy bài hát!");
            return res.redirect("back");
        }
        yield song_model_1.default.updateOne({ _id: IDSONG }, { deleted: true });
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
exports.deletePOST = deletePOST;
