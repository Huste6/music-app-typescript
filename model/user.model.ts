import mongoose from "mongoose";
import * as generate from "../helpers/generate"

const userSchema = new mongoose.Schema(
    {
        fullname:String,
        email: String,
        password: String,
        tokenUser: {
            type: String,
            default: generate.generateRandomString(20)
        },
        phone: String,
        avatar: String,
        gender:String,
        status: {
            type:String,
            default: "active"
        },
        deleted:{
            type: Boolean,
            default: false
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
)
const User = mongoose.model('User', userSchema,'users');

export default User;