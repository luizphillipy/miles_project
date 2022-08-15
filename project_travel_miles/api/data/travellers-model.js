const mongoose = require("mongoose");

const loyaltyProgramSchema = new mongoose.Schema({
    name:{
        type:String
       // required:true
        
    },
    memberId:String,
    milesAmount:Number,
    status: String,
    programType:String
()
});
const travellerSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    passport:{
        type:String,
        required:true
    },
    nationality:String,
    loyaltyPrograms: [loyaltyProgramSchema]
});
mongoose.model("Traveller",travellerSchema,"travellers");
