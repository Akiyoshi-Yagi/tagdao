import connectDB from "../../../utils/database"
import { ProposalModel } from "../../../utils/schemaModels"
import auth from "../../../utils/auth"
import { Network, Alchemy } from "alchemy-sdk";



const createProposal = async(req, res) => {
    
    try{
        //プロポー猿が作られた段階での投票権NFTの保有者を、プロポーサル-所有者配列の形で保管
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