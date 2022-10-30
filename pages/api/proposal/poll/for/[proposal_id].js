import connectDB from "../../../../../utils/database" 
import { ProposalModel, PollModel } from "../../../../../utils/schemaModels"
import auth from "../../../../../utils/auth"
import { Network, Alchemy } from "alchemy-sdk";

const settings = {
    apiKey: process.env.ALCHEMY_API, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

const updateProposal = async(req, res) => {

    const alchemy = new Alchemy(settings);
    const nftjson = await alchemy.nft.getOwnersForContract(process.env.NFT_CONTRACT_ADDRESS)

    if (!nftjson.owners.includes(req.body.address)){
        return res.status(400).json({message: " 投票権NFTを持っていません。"}) 
    }
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