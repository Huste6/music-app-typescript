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

export const songRoutes:Router = router;