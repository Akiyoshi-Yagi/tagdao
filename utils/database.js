import mongoose from "mongoose"

const connectDB = async() => {
    try{
        console.log(process.env.DATABASE_URL)
        await mongoose.connect(process.env.DATABASE_URL)
        console.log("Success: Connected to MongoDB")
    }catch(err){
        console.log("Failure: Unconnected to MongoDB")
        throw new Error()
    }
}

export default connectDB