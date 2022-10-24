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

const UserSchema = new Schema({
    address: {
        type: String,
        unique: true,
    }
})
    

export const ProposalModel = mongoose.models.Proposal || mongoose.model("Proposal", ProposalSchema)
export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema)