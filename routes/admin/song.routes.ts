import { Router } from "express";
import multer from 'multer';
const router:Router = Router();
import * as controller from "../../controller/admin/song.controller"
import {uploadFields} from "../../middleware/admin/uploadCloud.middleware"

const upload = multer();

router.get("/",controller.index);

router.get("/create",controller.create);

router.post(
    "/create",
    upload.fields([
        {name :"avatar", maxCount: 1 },
        {name: "audio", maxCount: 1}
    ]),
    uploadFields,
    controller.createPOST
);

router.get("/edit/:idSong",controller.edit);

router.patch(
    "/edit/:idSong",
    upload.fields([
        {name :"avatar", maxCount: 1 },
        {name: "audio", maxCount: 1}
    ]),
    uploadFields,
    controller.editPatch
);

router.patch("/change-status/:DataStatus/:DataID",controller.ChangeStatus);

router.get("/detail/:idSong",controller.detail);

router.post("/delete/:idSong",controller.deletePOST);

export const songRoutes:Router = router;