const { UserModel } = require('../Model/signupModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

const loginController = async (req, res) => {

    const {userName, password} = req.body

    const userinfo = await UserModel.findOne({userName})
    if(userinfo){
        const passOk = bcrypt.compareSync(password, userinfo.password)
        if(passOk){
            jwt.sign({userName, fullName: userinfo.fullName, id: userinfo._id, userImage: userinfo.userImage }, process.env.SECRETKEY, {}, (error, token) => {
                if (error) throw error
                res.cookie('token', token, {
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                }).json({userName, fullName: userinfo.fullName, id: userinfo._id, userImage: userinfo.userImage })
            });
        }
        else{
            res.status(401).json('Wrong Credentials')
        }
    }
    else{
        res.status(401).json('Wrong Credentials')
    }
    
}

module.exports = { loginController }