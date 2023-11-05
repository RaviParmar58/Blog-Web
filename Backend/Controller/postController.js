const PostModel = require('../Model/postModel')

const createnewpostController = async (req, res) =>{
    const filePath = req.file.path
   const {title, summary, postContent, id, status} = req.body
   const postData = await PostModel.create({
        title,
        summary,
        postContent,
        status,
        postThumnail: filePath,
        author: id
   });
   res.json(postData)
}

const getAllPostController = async (req, res) => {
     const postData = await PostModel.find({'status': 'Published'}).populate('author', ['userName', 'fullName', 'userImage'])
     res.json(postData)
}

const getPostController = async(req, res) => {
     const {id} = req.params
     const postData = await PostModel.findById(id).populate('author', ['userName', 'fullName', 'userImage'])
     res.json(postData)
}

const deletePostController = async (req, res) => {
     const { id } = req.params;
     try {
          const deletePost =  await PostModel.deleteOne({'_id': id})
          res.json(deletePost).status(200)
     } catch (error) {
          res.status(409).json({
               "message": 'Server Error!'
          })
     }
}

// const editPostController = async (req, res) => {
//      const { id } = req.params
//      try {
//           const post = await PostModel.findById(id)
//           res.status(200).json(post)
//      } catch (error) {
//           res.status(409).json({
//                "message": 'Server Error!'
//           })
//      }
// }

module.exports = { createnewpostController, getAllPostController, getPostController, deletePostController }