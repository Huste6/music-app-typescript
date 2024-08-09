import { Request, Response } from "express";
import Topic from "../../model/topic.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

// [GET] /admin/dashboard
export const index = async (req: Request, res: Response) => {
    const topics = await Topic.find({deleted:false})
    topics["length"] = await Topic.countDocuments();
    const songs = await Song.find({deleted:false})
    songs["length"] = await Song.countDocuments();
    const singers = await Singer.find({deleted:false})
    singers["length"] = await Singer.countDocuments();
    res.render("admin/pages/dashboard/index",{
        pageTitle: "Tổng quan",
        topics:topics,
        songs:songs,
        singers:singers
    })
}