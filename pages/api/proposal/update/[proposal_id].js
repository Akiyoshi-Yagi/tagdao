import connectDB from "../../../../utils/database" 
import { ProposalModel } from "../../../../utils/schemaModels"


const updateProposal = async(req, res) => {
    try{
        await connectDB()
        await ProposalModel.updateOne({_id: req.query.proposal_id}, req.body)
            return res.status(200).json({message: "アイテム編集成功"})
    }catch(err){
        return res.status(400).json({message: "アイテム編集失敗"})
    }
}

export default updateProposal