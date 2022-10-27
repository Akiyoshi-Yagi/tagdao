import { stringify } from "json5"
import mongoose from "mongoose"
import { boolean } from "webidl-conversions"

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
    address: String,
    for: Number,
    against: Number
})

const UserSchema = new Schema({
    address: {
        type: String,
        unique: true,
    }
})

const PollSchema = new Schema({
    proposalId: String,
    address: String,
    poll: Number,
})

    

export const ProposalModel = mongoose.models.Proposal || mongoose.model("Proposal", ProposalSchema)
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)
export const PollModel = mongoose.models.Poll || mongoose.model("Poll", PollSchema)