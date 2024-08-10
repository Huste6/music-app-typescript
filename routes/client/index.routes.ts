import { Express } from "express";
import {topicRoutes} from "./topic.routes"
import { songRoutes } from "./song.routes";
import { favoriteSongRoutes } from "./favorite-song.routes";
import { searchRoutes } from "./search.routes";
import { userRoutes } from "./user.routes";
import * as userMiddleware from "../../middleware/client/user.middleware"
import * as authMiddleware from "../../middleware/client/auth.middleware"

const clientRoutes = (app: Express):void => {
    app.use(userMiddleware.infoUser);
    app.use('/topics',topicRoutes);
    app.use('/songs',authMiddleware.requireAuth,songRoutes);
    app.use('/favorite-songs',authMiddleware.requireAuth,favoriteSongRoutes);
    app.use('/search',searchRoutes);
    app.use('/user',userRoutes);
}

export default clientRoutes;