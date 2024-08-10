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
exports.detail = exports.editPATCH = exports.edit = exports.deletePOST = exports.ChangeStatus = exports.index = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const song_model_1 = __importDefault(require("../../model/song.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({
        deleted: false
    });
    res.render("admin/pages/topics/index", {
        pageTitle: "Quản lý chủ đề",
        topics: topics
    });
});
exports.index = index;
const ChangeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.params.DataStatus;
    const idSong = req.params.DataID;
    yield topic_model_1.default.updateOne({
        _id: idSong
    }, {
        status: status
    });
    yield song_model_1.default.updateMany({
        topicId: idSong
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
const deletePOST = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTopic = req.params.idTopic;
    try {
        const topic = yield topic_model_1.default.findOne({ _id: idTopic });
        if (!topic) {
            req["flash"]("error", "Không tìm thấy chủ đề bài hát!");
            return res.redirect("back");
        }
        yield topic_model_1.default.updateOne({ _id: idTopic }, { deleted: true });
        yield song_model_1.default.updateMany({
            topicId: idTopic
        }, {
            deleted: true
        });
        req["flash"]("success", "Xóa thành công chủ đề bài hát!");
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
const edit = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idtopic = req.params.idtopic;
    const topic = yield topic_model_1.default.findOne({
        _id: idtopic
    });
    res.render("admin/pages/topics/edit", {
        pageTitle: "Chỉnh sửa",
        topic: topic
    });
});
exports.edit = edit;
const editPATCH = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idtopic = req.params.idtopic;
    yield topic_model_1.default.updateOne({
        _id: idtopic
    }, req.body);
    res.redirect("back");
});
exports.editPATCH = editPATCH;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idTopic = req.params.idTopic;
    let datasong = [];
    const topic = yield topic_model_1.default.findOne({
        _id: idTopic
    });
    const songInTopic = yield song_model_1.default.find({
        topicId: idTopic
    });
    for (const song of songInTopic) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId
        });
        const ObjectSong = {
            id: song.id,
            status: song.status,
            slug: song.slug,
            title: song.title,
            avatar: song.avatar,
            fullName: infoSinger.fullName
        };
        datasong.push(ObjectSong);
    }
    res.render("admin/pages/topics/detail", {
        pageTitle: "Chi tiết về chủ đề",
        datasong: datasong
    });
});
exports.detail = detail;
