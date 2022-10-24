import mongoose from "mongoose"

const Schema = mongoose.Schema

const ProposalSchema = new Schema({
    title: String,    
    type: String,
    status: String,
    image: String,
    link: String,             
    description: String,   
    result: String,   
    blocknumber: Number,
    start: Date,
    expair: Date,
})

export const ProposalModel = mongoose.models.Proposal || mongoose.model("Proposal", ProposalSchema)