import { Router } from "express";
import multer from 'multer';
const router:Router = Router();
import * as controller from "../../controller/admin/singer.controller"
import { uploadSingle } from "../../middleware/admin/uploadCloud.middleware"

const upload = multer();

router.get("/",controller.index);

router.get("/create",controller.create);

router.post(
    "/create",
    upload.single("avatar"),
    uploadSingle,
    controller.createPost
);

router.patch("/change-status/:DataStatus/:DataID",controller.changeSatus);

router.post("/delete/:dataId",controller.deletePOST);

router.get("/edit/:idSinger",controller.edit);

router.post(
    "/edit/:idSinger",
    upload.single("avatar"),
    uploadSingle,
    controller.editPOST
);

router.get("/detail/:idSinger",controller.detail);

export const SingerRoutes:Router = router;