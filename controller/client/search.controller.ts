import { Request, Response } from "express";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import {convertToSlug} from "../../helpers/converToSlug"

// [GET] /search/:type
export const result = async (req: Request, res: Response) => {
    try {
        const type = req.params.type;
        const keyword: string = req.query.keyword.toString();
        let newSongs = [];

        if (keyword) {
            const keywordRegex = new RegExp(keyword, "i");
            //Tao slug khong dau co them dau - ngan cach
            const stringSlug = convertToSlug(keyword);
            const stringSlugRegex = new RegExp(stringSlug, "i");
            //------------------------------------------
            const songs = await Song.find({
                $or:[
                    {title: keywordRegex},
                    {slug: stringSlugRegex}
                ]
            });
            for (const item of songs) {
                const infoSinger = await Singer.findOne({
                    _id:item.singerId
                });
                // item["infoSinger"]=infoSinger;
                newSongs.push({
                    id: item.id,
                    title: item.title,
                    avatar: item.avatar,
                    like: item.like,
                    slug: item.slug,
                    infoSinger: {
                        fullName: infoSinger.fullName
                    }
                })
            }
        }
        switch (type) {
            case "result":
                res.render("client/pages/search/result", {
                    pageTitle: `Kết quả: ${keyword}`,
                    keyword: keyword,
                    songs: newSongs
                });
                break;
            case "suggest":
                res.json({
                    code:200,
                    message: "Thành công!",
                    songs: newSongs
                })
                break;
            default:
                res.json({
                    code:400,
                    message: "Fall!"
                })
                break;
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};