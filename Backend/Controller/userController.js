const PostModel = require('../Model/postModel')

const userProfileController = async (req, res) => {
    const {id} = req.params
    const userPosts = await PostModel.find({'author': id})
    res.json(userPosts)
}

module.exports = userProfileController