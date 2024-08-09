import { Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/admin/user.controller"

router.get("/",controller.index);

export const UserRoutes:Router = router;