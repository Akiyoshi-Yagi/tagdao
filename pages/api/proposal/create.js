import connectDB from "../../../utils/database"
import { ProposalModel } from "../../../utils/schemaModels"
import auth from "../../../utils/auth"

const createProposal = async(req, res) => {
    
    try{
        await connectDB()
        req.body.for = "0"
        req.body.against = "0"
        console.log(req.body)
        await ProposalModel.create(req.body)
        return res.status(200).json({message: "プロポーサル作成成功"})
    }catch(err){
        return res.status(400).json({message: "アイテム作成失敗"})
    }
    
}
  
export default auth(createProposal)