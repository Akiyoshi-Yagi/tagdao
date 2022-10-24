import connectDB from "../../../utils/database"  
import { ProposalModel } from "../../../utils/schemaModels"

const getSingleProposal = async(req, res) => {  
    try{
        await connectDB()
        const singleProposal = await ProposalModel.findById(req.query.proposal_id) 
        return res.status(200).json({message: "アイテム読み取り成功（シングル）", singleProposal: singleProposal})
    }catch(err){
        return res.status(400).json({message: "アイテム読み取り失敗（シングル）"})
    }
}

export default getSingleProposal