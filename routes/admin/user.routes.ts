import { Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/admin/user.controller"

router.get("/",controller.index);

router.patch("/change-status/:DataStatus/:DataID", controller.changeStatus);

router.post("/delete/:dataId",controller.deletePost)

router.get("/detail/:idUser",controller.detail)

export const UserRoutes:Router = router;