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
exports.index = void 0;
const topic_model_1 = __importDefault(require("../../model/topic.model"));
const song_model_1 = __importDefault(require("../../model/song.model"));
const singer_model_1 = __importDefault(require("../../model/singer.model"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topics = yield topic_model_1.default.find({ deleted: false });
    topics["length"] = yield topic_model_1.default.countDocuments();
    const songs = yield song_model_1.default.find({ deleted: false });
    songs["length"] = yield song_model_1.default.countDocuments();
    const singers = yield singer_model_1.default.find({ deleted: false });
    singers["length"] = yield singer_model_1.default.countDocuments();
    res.render("admin/pages/dashboard/index", {
        pageTitle: "Tổng quan",
        topics: topics,
        songs: songs,
        singers: singers
    });
});
exports.index = index;
