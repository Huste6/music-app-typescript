import { Request,Response } from "express";
import User from "../../model/user.model";

//[GET] /admin/users
export const index = async(req:Request,res:Response) => {
    const users = await User.find({
        deleted:false
    }).select("-password -tokenUser")
    res.render("admin/pages/user/index",{
        pageTitle: "Tài khoản admin",
        users: users
    })
}
//[PATCH] /admin/accounts/change-status/:DataStatus/:DataID
export const changeStatus = async (req: Request, res: Response) => {
    const status = req.params.DataStatus;
    const idUser = req.params.DataID;
    await User.updateOne({
        _id:idUser
    },{
        status: status
    })
    res.json({
        code:200,
        message: "Thành công!",
        status: status
    })
}
// [POST] /admin/accounts/delete/:dataId
export const deletePost = async (req: Request, res: Response) => {
    const dataId = req.params.dataId;
    try {
        const user = await User.findOne({ _id: dataId });
        if (!user) {
            req["flash"]("error", "Không tìm thấy người dùng!");
            return res.redirect("back");
        }

        await User.updateOne({ _id: dataId }, { deleted: true });

        req["flash"]("success", "Xóa thành công người dùng!");
        return res.json({
            code: 200,
            message: "Success!"
        });
    } catch (error) {
        console.error("Error:", error);
        req["flash"]("error", "Có lỗi xảy ra!");
        return res.status(500).json({
            code: 500,
            message: "Internal Server Error",
        });
    }
}
// [GET] /admin/users/detail/:idUser
export const detail = async (req: Request, res: Response) => {
    const idAccountuser = req.params.idUser;
    const user = await User.findOne({
        _id: idAccountuser
    });
    if(!user){
        req["flash"]("error","Không tìm thấy tài khoản người dùng!");
        return res.redirect("back");
    }
    res.render("admin/pages/user/detail",{
        pageTitle: "Chi tiết tài khoản user",
        user: user
    })
}