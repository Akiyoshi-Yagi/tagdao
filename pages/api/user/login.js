import connectDB from "../../../utils/database"
import { UserModel } from "../../../utils/schemaModels"
import jwt from "jsonwebtoken"

const secret_key = "tagdao"

const loginUser = async(req, res) => {
    try {
        await connectDB()
        const savedUserData = await UserModel.findOne({address: req.body.address})
        if(savedUserData){
            const payload = {
                address: req.body.address,
            }
            const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
            console.log(token)

            return res.status(200).json({message: "ログイン成功"})
        }else{
            await UserModel.create(req.body)
            const payload = {
                address: req.body.address,
            }
            const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
            
            return res.status(200).json({message: "ユーザー登録成功"})
        }
    } catch (error) {
        return res.status(400).json({message: "ログイン失敗"})
    }
}

export default loginUser