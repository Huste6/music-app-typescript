import { Request, Response } from "express";
import Account from "../../model/account-admin.model";
import md5 from "md5"
// [GET] /admin/my-account
export const index = async (req: Request, res: Response) => { 
    res.render("admin/pages/my-account/index",{
        pageTitle: "Tài khoản admin"
    })
}
// [GET] /admin/my-account/edit
export const edit = async (req: Request, res: Response) =>{
    res.render("admin/pages/my-account/edit",{
        pageTitle:"Chỉnh sửa thông tin cá nhân"
    })
}
// [PATCH] /admin/my-account/edit
export const editPatch = async (req: Request, res: Response) => {
    const emailExist = await Account.findOne({
        _id: {$ne: res.locals.user.id},
        email: req.body.email,
        deleted: false,
    })
    if(emailExist){
        req["flash"]("error","Email này đã tồn tại");
    }else{
        if(req.body.password){
            req.body.password = md5(req.body.password)
        }else{
            delete req.body.password
        }
        await Account.updateOne({_id: res.locals.user.id},req.body)
        req["flash"]("success","Cập nhật thành công")
    }
    res.redirect("back");
}