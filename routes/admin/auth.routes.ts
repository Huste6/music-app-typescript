import { Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/admin/auth.controller"

router.get("/login",controller.login);

export const AuthRouter:Router = router;