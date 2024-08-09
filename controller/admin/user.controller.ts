import { Request,Response } from "express";
import User from "../../model/user.model";

//[GET] /admin/users
export const index = async(req:Request,res:Response) => {
    const accounts = await User.find({
        deleted:false
    }).select("-password -tokenUser")
    res.render("admin/pages/user/index",{
        pageTitle: "Tài khoản admin",
        accounts: accounts
    })
}