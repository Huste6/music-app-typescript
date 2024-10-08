import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

// [GET] /admin/topics
export const index = async (req: Request, res: Response) => {
    const topics = await Topic.find({
        deleted: false
    })

    res.render("admin/pages/topics/index",{
        pageTitle: "Quản lý chủ đề",
        topics: topics
    })
}
// [PATCH] /admin/topics/change-status/:DataStatus/:DataID
export const ChangeStatus = async (req: Request, res: Response) => {
    const status = req.params.DataStatus;
    const idSong = req.params.DataID;

    await Topic.updateOne({
        _id:idSong
    },{
        status: status
    })
    await Song.updateMany(
        {
            topicId: idSong
        },
        {
            status: status
        }
    )
    res.json({
        code:200,
        message: "Thành công!",
        status: status
    })
}
// [POST] /admin/topics/delete/:idTopic
export const deletePOST = async (req: Request, res: Response) => {
    const idTopic = req.params.idTopic;
    try {
        const topic = await Topic.findOne({ _id: idTopic });
        if (!topic) {
            req["flash"]("error", "Không tìm thấy chủ đề bài hát!");
            return res.redirect("back");
        }
        await Topic.updateOne({ _id: idTopic }, { deleted: true });
        await Song.updateMany(
            {
                topicId: idTopic
            },
            {
                deleted:true
            }
        )
        req["flash"]("success", "Xóa thành công chủ đề bài hát!");
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
// [GET] /admin/topics/edit/:idtopic
export const edit = async (req: Request, res: Response) => {
    const idtopic = req.params.idtopic;
    const topic = await Topic.findOne({
        _id:idtopic
    });
    res.render("admin/pages/topics/edit",{
        pageTitle: "Chỉnh sửa",
        topic: topic
    })
}
// [PATCH] /admin/topics/edit/:idtopic
export const editPATCH = async (req: Request, res: Response) => {
    const idtopic = req.params.idtopic;
    await Topic.updateOne({
        _id: idtopic
    }, req.body);
    res.redirect("back");
}
// [GET] /admin/topics/detail/:idTopic
export const detail = async (req: Request, res: Response) => {
    const idTopic = req.params.idTopic;
    let datasong = [];
    const topic = await Topic.findOne({
        _id:idTopic
    });
    const songInTopic = await Song.find({
        topicId: idTopic
    });
    for (const song of songInTopic) {
        const infoSinger = await Singer.findOne({
            _id: song.singerId 
        });
        const ObjectSong = {
            id: song.id,
            status: song.status,
            slug: song.slug,
            title: song.title,
            avatar: song.avatar,
            fullName: infoSinger.fullName
        }
        datasong.push(ObjectSong);
    }
    res.render("admin/pages/topics/detail",{
        pageTitle: "Chi tiết về chủ đề",
        datasong: datasong
    })
}