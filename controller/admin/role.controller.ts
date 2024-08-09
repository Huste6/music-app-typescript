import { Request, Response } from "express";
import Role from "../../model/role.model";
import { systemConfig } from "../../config/config";

// [GET] /admin/roles
export const index = async (req: Request, res: Response) => {
    let find = {
        deleted: false
    }
    const record = await Role.find(find);

    res.render("admin/pages/roles/index",{
        pageTitle: "Nhóm Quyền",
        record: record
    })
}
// [GET] /admin/roles/create
export const create = async (req: Request, res: Response) => {
    res.render("admin/pages/roles/create",{
        pageTitle: "Tạo nhóm Quyền"
    })
}
// [POST] /admin/roles/create
export const createPost = async (req: Request, res: Response) => {
    const record = new Role(req.body)
    await record.save();
    res.redirect(`${systemConfig.prefixAdmin}/roles`)
}
// [GET] /admin/roles/edit/:id
export const edit = async (req: Request, res: Response) => {
    try{
        const record = await Role.findOne({
            _id:req.params.id,
            deleted: false
        })
        res.render("admin/pages/roles/edit",{
            pageTitle: "Sửa nhóm Quyền",
            record: record
        })
    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    }
}
// [PATCH] /admin/roles/edit/:id
export const editPatch = async (req: Request, res: Response) => {
    try{
        await Role.updateOne({
            _id: req.params.id
        },req.body)
        req["flash"]("success","Cập nhật nhóm quyền thành công")
    }catch(error){
        req["flash"]("error","Cập nhật nhóm quyền thất bại!")      
    }
    res.redirect("back");
}
// [GET] /admin/roles/permissions
export const permissions = async (req: Request, res: Response) => {
    const record = await Role.find({
        deleted: false
    })
    res.render("admin/pages/roles/permissions",{
        pageTitle: "Phân Quyền",
        record: record
    })
}
// [PATCH] /admin/roles/permissions
export const permissionsPatch = async (req: Request, res: Response) => {
    const permissions = JSON.parse(req.body.permissions);
    for (const item of permissions) {
        await Role.updateOne(
            {
                _id: item.id
            },
            {
                permissions: item.permission
            }
        )
    }
    req["flash"]("success","Cập nhật quyền thành công")
    res.redirect("back");
}
