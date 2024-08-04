import { Request, Response } from "express";
import Song from "../../model/song.model";
import Singer from "../../model/singer.model";
import {convertToSlug} from "../../helpers/converToSlug"

// [GET] /search/result
export const result = async (req: Request, res: Response) => {
    try {
        const keyword: string = req.query.keyword.toString();
        let newSongs = [];

        if (keyword) {
            const keywordRegex = new RegExp(keyword, "i");
            //Tao slug khong dau co them dau - ngan cach
            const stringSlug = convertToSlug(keyword);
            const stringSlugRegex = new RegExp(stringSlug, "i");
            //------------------------------------------
            newSongs = await Song.find({
                $or:[
                    {title: keywordRegex},
                    {slug: stringSlugRegex}
                ]
            });
            for (const item of newSongs) {
                const infoSinger = await Singer.findOne({
                    _id:item.singerId
                });
                item["infoSinger"]=infoSinger;
            }
        }
        res.render("client/pages/search/result", {
            pageTitle: `Kết quả: ${keyword}`,
            keyword: keyword,
            songs: newSongs
        });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};
