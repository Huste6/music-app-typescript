import { Request, Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/songs
export const index = async (req: Request, res: Response) => {
    const songs = await Song.find({
        deleted:false
    })
    res.render("admin/pages/songs/index",{
        pageTitle: "Quản lý bài hát",
        songs:songs
    })
}
// [GET] /admin/songs/create
export const create = async (req: Request, res: Response) =>{
    const topics = await Topic.find({
        deleted:false,
        status: "active"
    }).select("id title");

    const singers = await Singer.find({
        deleted:false,
        status: "active"
    }).select("id fullName");

    res.render("admin/pages/songs/create",{
        pageTitle: "Thêm mới bài hát",
        topics: topics,
        singers: singers
    })
}
// [POST] /admin/songs/create
export const createPOST = async (req: Request, res: Response) => {
    let avatar = "";
    let audio = "";
    if(req.body.avatar){
        avatar = req.body.avatar[0]
    }
    if(req.body.audio){
        audio = req.body.audio[0]
    }
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        lyrics: req.body.lyrics,
        status:req.body.status,
        avatar: avatar,
        audio: audio
    }
    const song = new Song(dataSong);
    await song.save();

    res.redirect(`${systemConfig.prefixAdmin}/songs`);
}
// [GET] /admin/songs/edit/:idSong
export const edit = async (req: Request, res: Response) => {
    const idSong = req.params.idSong;
    const song = await Song.findOne({
        _id:idSong,
        deleted:false
    });

    const topics = await Topic.find({
        deleted:false
    }).select("title");

    const singers = await Singer.find({
        deleted:false
    }).select("fullName");

    res.render("admin/pages/songs/edit",{
        pageTitle: "Chỉnh sửa bài hát",
        song: song,
        topics:topics,
        singers: singers
    })
}
// [PATCH] /admin/songs/edit/:idSong
export const editPatch = async (req: Request, res: Response) => {
    const idSong = req.params.idSong;
    
    const dataSong = {
        title: req.body.title,
        topicId: req.body.topicId,
        singerId: req.body.singerId,
        description: req.body.description,
        lyrics: req.body.lyrics,
        status:req.body.status
    }

    if(req.body.avatar){
        dataSong["avatar"] = req.body.avatar[0]
    }

    if(req.body.audio){
        dataSong["audio"] = req.body.audio[0]
    }

    await Song.updateOne({
        _id: idSong
    },dataSong)
    res.redirect("back");
}
// [PATCH] /admin/songs/change-status/:DataStatus/:DataID
export const ChangeStatus = async (req: Request, res: Response) => {
    const status = req.params.DataStatus;
    const idSong = req.params.DataID;
    await Song.updateOne({
        _id:idSong
    },{
        status: status
    })
    res.json({
        code:200,
        message: "Thành công!",
        status: status
    })
}
// [GET] /admin/songs/detail/:idSong
export const detail = async (req: Request, res: Response) => {
    const IDSong = req.params.idSong;
    const song = await Song.findOne({
        _id:IDSong
    });
    res.render("admin/pages/songs/detail",{
        pageTitle: "Chi tiết bài hát",
        song: song
    })
}
// [POST] /admin/songs/delete/:idSong
export const deletePOST = async (req: Request, res: Response) => {
    const IDSONG = req.params.idSong;
    try {
        const song = await Song.findOne({ _id: IDSONG });
        if (!song) {
            req["flash"]("error", "Không tìm thấy bài hát!");
            return res.redirect("back");
        }

        await Song.updateOne({ _id: IDSONG }, { deleted: true });

        req["flash"]("success", "Xóa thành công bài hát!");
        return res.json({
            code: 200,
            message: "Success!"
        });
    } catch (error) {
        console.error("Error:", error);
        req["flash"]("error", "Có lỗi xảy ra!");
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
};