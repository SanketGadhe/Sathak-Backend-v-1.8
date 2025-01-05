const mongoose=require('mongoose')
const bcrypt = require("bcrypt");
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    profileImage : { type: String, default: "default.jpeg" },
    courseEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
}
)
userSchema.methods.matchPassword = async function (enteredPassword) {
    // 'this' refers to the current document (the user object)
    return await bcrypt.compare(enteredPassword, this.password);
};
module.exports=mongoose.model('user',userSchema)
