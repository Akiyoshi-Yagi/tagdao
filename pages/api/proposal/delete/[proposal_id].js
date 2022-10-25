import connectDB from "../../../../utils/database"
import { ProposalModel } from "../../../../utils/schemaModels"
import auth from "../../../../utils/auth"

const deleteProposal = async(req, res) => {
    try{
        await connectDB()
        const singleProposal = await ProposalModel.findById(req.query.proposal_id)
        if(singleProposal.address === req.body.address){
            await ProposalModel.deleteOne({_id: req.query.proposal_id})
            return res.status(200).json({message: "アイテム削除成功"})
        }else{
            throw new Error()
        }
        
            
    }catch(err){
        return res.status(400).json({message: "アイテム削除失敗"})
    }
}

export default auth(deleteProposal)