import { Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/admin/auth.controller"

router.get("/login",controller.login);

router.post("/login",controller.loginPost);

router.get("/logout",controller.logout)

export const AuthRouter:Router = router;