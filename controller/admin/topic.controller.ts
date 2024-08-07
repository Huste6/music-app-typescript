import { Request, Response } from "express";
import Topic from "../../model/topic.model";

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
    res.json({
        code:200,
        message: "Thành công!",
        status: status
    })
}