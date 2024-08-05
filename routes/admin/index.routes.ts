import { Express } from "express";
import { dashboardRoutes } from "./dashboard.routes";
import { systemConfig } from "../../config/config";
import { topicsRoutes } from "./topic.routes";

const adminRoutes = (app: Express):void => {
    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`, dashboardRoutes);
    app.use(`${PATH_ADMIN}/topics`, topicsRoutes);
}

export default adminRoutes;