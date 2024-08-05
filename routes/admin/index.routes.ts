import { Express } from "express";
import { dashboardRoutes } from "./dashboard.routes";
import { systemConfig } from "../../config/config";
import { topicsRoutes } from "./topic.routes";
import { songRoutes } from "./song.routes";

const adminRoutes = (app: Express):void => {
    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);
    app.use(`${PATH_ADMIN}/topics`, topicsRoutes);
    app.use(`${PATH_ADMIN}/songs`, songRoutes);
}

export default adminRoutes;