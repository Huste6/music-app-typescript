import { Request, Response } from "express";
import Song from "../../model/song.model";
import Topic from "../../model/topic.model";
import Singer from "../../model/singer.model";

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