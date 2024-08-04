import { Express } from "express";
import {topicRoutes} from "./topic.routes"
import { songRoutes } from "./song.routes";
import { favoriteSongRoutes } from "./favorite-song.routes";
import { searchRoutes } from "./search.routes";

const clientRoutes = (app: Express):void => {
    app.use('/topics',topicRoutes);
    app.use('/songs',songRoutes);
    app.use('/favorite-songs',favoriteSongRoutes);
    app.use('/search',searchRoutes);
}

export default clientRoutes;