import connectDB from "../../../../utils/database" 
import { ProposalModel } from "../../../../utils/schemaModels"
import auth from "../../../../utils/auth"


const updateProposal = async(req, res) => {
    try{
        await connectDB()
        const singleProposal = await ProposalModel.findById(req.query.proposal_id)
        //console.log(singleProposal)
        if(singleProposal.address === req.body.address){
            
            await ProposalModel.updateOne({_id: req.query.proposal_id}, req.body)
            return res.status(200).json({message: "アイテム編集成功"})
        }else{
            throw new Error()
        }        
    }catch(err){
        return res.status(400).json({message: "アイテム編集失敗卍"})
    }
}

export default auth(updateProposal)