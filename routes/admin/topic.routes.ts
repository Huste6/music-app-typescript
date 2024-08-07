import { Router } from "express";
const router:Router = Router();
import * as controller from "../../controller/admin/topic.controller"

router.get("/",controller.index);

router.patch("/change-status/:DataStatus/:DataID",controller.ChangeStatus);

router.post("/delete/:idTopic",controller.deletePOST);

export const topicsRoutes:Router = router;