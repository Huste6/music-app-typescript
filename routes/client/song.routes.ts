import { Request,Response, Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/client/song.controller"

router.get("/:slugTopic",controller.list)

router.get("/detail/:slugSong",controller.detail)

router.patch("/like/:typeLike/:idSong",controller.like)

router.patch("/favorite/:typeFavorite/:idSong",controller.favorite)

export const songRoutes:Router = router;