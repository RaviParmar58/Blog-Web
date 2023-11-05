const jwt = require('jsonwebtoken')

const profileController = (req, res) => {
    const {token} = req.cookies;
    if(token){
        jwt.verify(token, process.env.SECRETKEY, {}, (error, info) => {
            if (error) throw error
            res.json(info)
        })
    }
    else{
        res.json(null)
    }
}

module.exports = { profileController }