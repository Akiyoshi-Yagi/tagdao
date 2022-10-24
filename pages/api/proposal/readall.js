import connectDB from "../../../utils/database"
import { ProposalModel } from "../../../utils/schemaModels"

const getAllProposals = async(req, res) => {
    try{
        await connectDB()
        const allProposals = await ProposalModel.find()
        return res.status(200).json({message: "プロポーサル読み取り成功（オール）", allProposals: allProposals})
    }catch(err){
        return res.status(400).json({message: "プロポーサル読み取り失敗（オール）"})
    }
}

export default getAllProposals