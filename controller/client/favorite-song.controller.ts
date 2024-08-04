import { Request,Response } from "express"
import favoriteSong from "../../model/favorite-song.model"
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";

// [GET] /favorite-songs
export const index = async (req:Request,res:Response)=>{
    const favoriteSongs = await favoriteSong.find({
        deleted:false,
        // userId: ""
    });
    for (const item of favoriteSongs) {
        const infoSong = await Song.findOne({
            _id: item.songId
        }).select("title avatar slug singerId")
        const infoSinger = await Singer.findOne({
            _id: infoSong.singerId 
        }).select("fullName")
        item["infoSong"]= infoSong;
        item["infoSinger"]= infoSinger;
    }
    res.render("client/pages/favorite-songs/index",{
        pageTitle:"Bài hát yêu thích",
        favoriteSongs:favoriteSongs
    })
}