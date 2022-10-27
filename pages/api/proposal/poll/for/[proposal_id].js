import connectDB from "../../../../../utils/database" 
import { ProposalModel, PollModel } from "../../../../../utils/schemaModels"
import auth from "../../../../../utils/auth"


const updateProposal = async(req, res) => {
    await connectDB()
    const singlePoll = await PollModel.findOne({proposalId : req.query.proposal_id, address : req.body.address})
    console.log("singlePoll")
    console.log(singlePoll)
    if (singlePoll != null){
        return res.status(400).json({message: " すでに投票しています"}) 
    }else{
        await PollModel.create({proposalId : req.query.proposal_id, address : req.body.address, poll: 1}) //賛成は、0で表している
        const singleProposal = await ProposalModel.findOne({_id : req.query.proposal_id})
        singleProposal.for = singleProposal.for + 1
        await ProposalModel.updateOne({_id: req.query.proposal_id}, singleProposal)
        return res.status(200).json({message: "賛成に投票成功"}) 
    }
}

export default auth(updateProposal)