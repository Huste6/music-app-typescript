import { Request,Response } from "express"
import Topic from "../../model/topic.model";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

//[GET] /songs/:slugTopic
export const list = async(req:Request,res:Response)=>{
    const topic = await Topic.findOne({
        slug:req.params.slugTopic,
        status:"active",
        deleted:false
    });
    const songs = await Song.find({
        topicId:topic.id,
        status:"active",
        deleted:false
    }).select("avatar title slug singerId like");
    for (const song of songs) {
        const infoSinger = await Singer.findOne({
            _id:song.singerId,
            status:"active",
            deleted:false
        });
        song["infoSinger"] = infoSinger;
    }
    res.render("client/pages/songs/list",{
        pageTitle: topic.title,
        songs: songs
    })
}
//[GET] /songs/detail/:slugSong
export const detail = async(req:Request,res:Response)=>{
    const slugSong = req.params.slugSong;
    const song = await Song.findOne({
        slug:slugSong,
        status:"active",
        deleted:false
    });
    
    const singer = await Singer.findOne({
        _id:song.singerId,
        deleted:false,
    }).select("fullName avatar");
    
    const topic = await Topic.findOne({
        _id:song.topicId,
        deleted:false,
    }).select("title");
    
    res.render("client/pages/songs/detail",{
        pageTitle: "Chi tiết bài hát",
        song:song,
        singer:singer,
        topic:topic
    });
}