import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connection.on('connected',()=>
            console.log("Database Connected")
        )
        await mongoose.connect(`${process.env.MONGOURL}`)
    }
    catch (error) {
        console.error(error.message);
        
    }
}
export default connectDb