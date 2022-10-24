import connectDB from "../../../../utils/database"
import { ProposalModel } from "../../../../utils/schemaModels"

const deleteProposal = async(req, res) => {
    try{
        await connectDB()
        await ProposalModel.deleteOne({_id: req.query.proposal_id})
            return res.status(200).json({message: "アイテム削除成功"})
    }catch(err){
        return res.status(400).json({message: "アイテム削除失敗"})
    }
}

export default deleteProposal