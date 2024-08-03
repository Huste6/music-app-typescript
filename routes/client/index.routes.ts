import { Express } from "express";
import {topicRoutes} from "./topic.routes"
import { songRoutes } from "./song.routes";

const clientRoutes = (app: Express):void => {
    app.use('/topics',topicRoutes);
    app.use('/songs',songRoutes);
}

export default clientRoutes;