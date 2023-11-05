const jwt = require('jsonwebtoken')
const { UserModel, checkUsernameExists } = require('../Model/signupModel')
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const signupController = async (req, res) => {
    const userImage = req.file.path
    let { fullName, userName, email, password} = req.body
    
    const alreadyExist = await checkUsernameExists(userName, email)
    
    if (alreadyExist) {
        UserModel.create({ fullName, userName, email, userImage, password: bcrypt.hashSync(password, salt) }).then(result => {
            jwt.sign({userName, fullName, id: result._id, userImage }, process.env.SECRETKEY, {}, (error, token) => {
                if (error) throw error
                res.cookie('token', token, {
                    maxAge: 365 * 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                }).json({userName, fullName, id: result._id, userImage }).status(200).json({
                    "message": "Signup Successfully!"
                })
            });
        }).catch(err => {
            res.status(409).json({
                "message": 'Server Error!'
            });
        });
    }
    else{
        res.status(403).json({
            "message": "Username Already Exists!"
        });
    }
}

module.exports = {
    signupController
}