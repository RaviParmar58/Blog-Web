const mongoose = require('mongoose');

const SignupSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    userImage: {
        type: String
    }
},
{timestamps: true}
)

const UserModel = mongoose.model('userInfo', SignupSchema);

async function checkUsernameExists(userName, email){
    const user = await UserModel.findOne({ userName, email});
    return user == null
}

module.exports = {UserModel, checkUsernameExists}