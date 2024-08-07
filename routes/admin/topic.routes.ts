import { Router } from "express";
import multer from 'multer';
const router:Router = Router();
import * as controller from "../../controller/admin/topic.controller"
import {uploadFields,uploadSingle} from "../../middleware/admin/uploadCloud.middleware"

const upload = multer();

router.get("/",controller.index);

router.patch("/change-status/:DataStatus/:DataID",controller.ChangeStatus);

router.post("/delete/:idTopic",controller.deletePOST);

router.get("/edit/:idtopic", controller.edit);

router.patch(
    "/edit/:idtopic", 
    upload.single("avatar"),
    uploadSingle,
    controller.editPATCH
);

router.get("/detail/:idTopic",controller.detail);

export const topicsRoutes:Router = router;