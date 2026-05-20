import mongoose from "mongoose"


export const connectDB = async() => {
  try{
    const connect = await  mongoose.connect('mongodb+srv://jinalrathod594_db_user:jinal@594J@cluster0.qwbepcd.mongodb.net/')
    console.log(connect.connection.host);
  }catch(err){
    console.log(err);
    
  }
}