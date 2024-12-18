import mongoose from 'mongoose';
require('dotenv').config();

const dbUrl: string =
  
  "mongodb+srv://bereketdinku:beki1234@cluster0.a7un02o.mongodb.net/lms";

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`Database connected with ${data.connection.host}`)
        })
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;