import { Request,Response } from "express";
import Singer from "../../model/singer.model";
import { systemConfig } from "../../config/config";
//[GET] /admin/singers
export const index = async (req:Request,res:Response) => {
    const singers = await Singer.find({
        deleted:false
    });
    res.render("admin/pages/singers/index",{
        pageTitle: "Quản lý ca sỹ",
        singers: singers
    })
}
//[GET] /admin/singers/create
export const create = async (req:Request,res:Response) => {
    res.render("admin/pages/singers/create",{
        pageTitle: "Tạo mới ca sỹ"
    })
}
//[POST] /admin/singers/create
export const createPost = async (req:Request,res:Response) => {
    const newSinger = new Singer(req.body);
    newSinger.save();
    res.redirect(`${systemConfig.prefixAdmin}/singers`)
}
//[PATCH] /admin/singers/change-status/:DataStatus/:DataID
export const changeSatus = async (req:Request,res:Response) => {
    const status = req.params.DataStatus;
    const singerid = req.params.DataID;
    await Singer.updateOne({
        _id :singerid
    },{
        status:status
    })
    res.json({
        code:200,
        message: "Success"
    })
}
//[POST] /admin/singers/delete/:dataId
export const deletePOST = async (req:Request,res:Response) => {
    const idSinger = req.params.dataId;
    await Singer.updateOne({
        _id:idSinger
    },{
        deleted:true
    })
    res.json({
        code:200,
        message: "Success!"
    })
}
//[GET] /admin/singers/edit/:idSinger
export const edit = async (req:Request,res:Response) => {
    const idSinger = req.params.idSinger;
    const singer = await Singer.findOne({
        _id: idSinger
    })
    res.render("admin/pages/singers/edit",{
        pageTitle: "Chỉnh sửa thông tin ca sỹ",
        singer: singer
    })
}
//[POST] /admin/singers/edit/:idSinger
export const editPOST = async (req:Request,res:Response) => {
    const idSinger = req.params.idSinger;
    const ExistSinger = await Singer.findOne({
        _id:idSinger
    })
    if(ExistSinger){
        await Singer.updateOne(
            {
                _id:idSinger
            },req.body
        )
        req["flash"]("success","Cập nhật thành công!");
    }
    res.redirect("back");
}
//[GET] /admin/singers/detail/:idSinger
export const detail = async (req:Request,res:Response) => {
    const idSinger = req.params.idSinger;
    const singer = await Singer.findOne({
        _id:idSinger
    });
    res.render("admin/pages/singers/detail",{
        pageTitle: "Thông tin về ca sỹ",
        singer: singer
    })
}