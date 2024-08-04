import { Express } from "express";
import {topicRoutes} from "./topic.routes"
import { songRoutes } from "./song.routes";
import { favoriteSongRoutes } from "./favorite-song.routes";

const clientRoutes = (app: Express):void => {
    app.use('/topics',topicRoutes);
    app.use('/songs',songRoutes);
    app.use('/favorite-songs',favoriteSongRoutes)
}

export default clientRoutes;