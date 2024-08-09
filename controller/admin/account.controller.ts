import { Request, Response } from "express";
import Account from "../../model/account-admin.model";
import Role from "../../model/role.model";
import { systemConfig } from "../../config/config";
import md5 from "md5";

// [GET] /admin/accounts
export const index = async (req: Request, res: Response) => {
    const accounts = await Account.find({
        deleted:false
    }).select("-password -token")
    for (const item of accounts) {
        const role = await Role.findOne({_id: item.role_id});
        item["role_title"] = role.title;
    }
    res.render("admin/pages/accounts/index",{
        pageTitle: "Tài khoản admin",
        accounts: accounts
    })
}
// [GET] /admin/accounts/create
export const create = async (req: Request,res:Response) => {
    const role = await Role.find({
        deleted: false
    });

    res.render("admin/pages/accounts/create",{
        pageTitle: "Tạo tài khoản",
        role: role
    })
}
//[POST] /admin/accounts/create
export const createPost = async (req: Request, res: Response) => {
    const emailExist = await Account.findOne({
        email: req.body.email,
        deleted: false,
    })
    if(emailExist){
        req["flash"]("error","Email này đã tồn tại");
        res.redirect("back");
    }else{
        req.body.password = md5(req.body.password);
        const record = new Account(req.body);
        await record.save();
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }
}
//[PATCH] /admin/accounts/change-status/:DataStatus/:DataID
export const changeStatus = async (req: Request, res: Response) => {
    const status = req.params.DataStatus;
    const idAccount = req.params.DataID;
    await Account.updateOne({
        _id:idAccount
    },{
        status: status
    })
    res.json({
        code:200,
        message: "Thành công!",
        status: status
    })
}
// [GET] /admin/accounts/edit/:id
export const edit = async (req: Request, res: Response) => {
    try{
        const data = await Account.findOne({
            _id: req.params.id,
            deleted: false
        })
        const role = await Role.find({deleted: false})

        res.render("admin/pages/accounts/edit",{
            pageTitle: "Chỉnh sửa tài khoản",
            data: data,
            role: role
        })
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/accounts`)
    }
}
// [PATCH] /admin/accounts/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    try{
        const emailExist = await Account.findOne({
            _id: {$ne: req.params.id},
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
            await Account.updateOne({_id: req.params.id},req.body)
            req["flash"]("success","Cập nhật thành công")
        }
        res.redirect("back");
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}