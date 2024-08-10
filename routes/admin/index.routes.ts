import { Express } from "express";
import { dashboardRoutes } from "./dashboard.routes";
import { systemConfig } from "../../config/config";
import { topicsRoutes } from "./topic.routes";
import { songRoutes } from "./song.routes";
import { uploadRoutes } from "./upload.routes";
import { SingerRoutes } from "./singer.routes";
import { AuthRouter } from "./auth.routes";
import * as authMiddleware from "../../middleware/admin/auth.middleware"
import { accountRoutes } from "./account.routes";
import { RoleRoutes } from "./role.routes";
import { UserRoutes } from "./user.routes";

const adminRoutes = (app: Express):void => {
    const PATH_ADMIN = `${systemConfig.prefixAdmin}`;

    app.use(`${PATH_ADMIN}/dashboard`,authMiddleware.requireAuth, dashboardRoutes);
    app.use(`${PATH_ADMIN}/topics`, authMiddleware.requireAuth,topicsRoutes);
    app.use(`${PATH_ADMIN}/songs`,authMiddleware.requireAuth, songRoutes);
    app.use(`${PATH_ADMIN}/upload`,authMiddleware.requireAuth, uploadRoutes);
    app.use(`${PATH_ADMIN}/singers`,authMiddleware.requireAuth, SingerRoutes);
    app.use(`${PATH_ADMIN}/auth`,AuthRouter);
    app.use(`${PATH_ADMIN}/accounts`,authMiddleware.requireAuth,accountRoutes);
    app.use(`${PATH_ADMIN}/roles`,authMiddleware.requireAuth,RoleRoutes)
    app.use(`${PATH_ADMIN}/users`,authMiddleware.requireAuth,UserRoutes)
}

export default adminRoutes;