"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dashboard_routes_1 = require("./dashboard.routes");
const config_1 = require("../../config/config");
const topic_routes_1 = require("./topic.routes");
const song_routes_1 = require("./song.routes");
const upload_routes_1 = require("./upload.routes");
const singer_routes_1 = require("./singer.routes");
const auth_routes_1 = require("./auth.routes");
const authMiddleware = __importStar(require("../../middleware/admin/auth.middleware"));
const account_routes_1 = require("./account.routes");
const role_routes_1 = require("./role.routes");
const user_routes_1 = require("./user.routes");
const my_account_routes_1 = require("./my-account.routes");
const adminRoutes = (app) => {
    const PATH_ADMIN = `${config_1.systemConfig.prefixAdmin}`;
    app.use(`${PATH_ADMIN}/dashboard`, authMiddleware.requireAuth, dashboard_routes_1.dashboardRoutes);
    app.use(`${PATH_ADMIN}/topics`, authMiddleware.requireAuth, topic_routes_1.topicsRoutes);
    app.use(`${PATH_ADMIN}/songs`, authMiddleware.requireAuth, song_routes_1.songRoutes);
    app.use(`${PATH_ADMIN}/upload`, authMiddleware.requireAuth, upload_routes_1.uploadRoutes);
    app.use(`${PATH_ADMIN}/singers`, authMiddleware.requireAuth, singer_routes_1.SingerRoutes);
    app.use(`${PATH_ADMIN}/auth`, auth_routes_1.AuthRouter);
    app.use(`${PATH_ADMIN}/accounts`, authMiddleware.requireAuth, account_routes_1.accountRoutes);
    app.use(`${PATH_ADMIN}/roles`, authMiddleware.requireAuth, role_routes_1.RoleRoutes);
    app.use(`${PATH_ADMIN}/users`, authMiddleware.requireAuth, user_routes_1.UserRoutes);
    app.use(`${PATH_ADMIN}/my-account`, authMiddleware.requireAuth, my_account_routes_1.MyaccountRoutes);
};
exports.default = adminRoutes;
