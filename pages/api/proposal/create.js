import connectDB from "../../../utils/database"
import { ProposalModel } from "../../../utils/schemaModels"

const createProposal = async(req, res) => {
    
    try{
        await connectDB()
        await ProposalModel.create(req.body)
        return res.status(200).json({message: "プロポーサル作成成功"})
    }catch(err){
        return res.status(400).json({message: "アイテム作成失敗"})
    }
    
}
  
export default createProposal