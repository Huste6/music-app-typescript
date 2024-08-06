import { Request,Response,NextFunction } from "express";
import User from "../../model/user.model";

export const infoUser = async (req:Request ,res:Response, next:NextFunction) => {
    if(req.cookies.tokenUser){
        const user = await User.findOne({
            tokenUser: req.cookies.tokenUser,
            deleted: false,
            status:"active"
        }).select("-password");

        if(user){
            res.locals.user = user;
        }
    }
    next();
}