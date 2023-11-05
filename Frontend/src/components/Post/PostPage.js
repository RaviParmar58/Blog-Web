import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import './PostPage.css'
import { format, formatISO9075 } from 'date-fns'

export default function PostPage (){

    const [postInfo, setPostinfo] = useState('')
    const {id} = useParams()

    useEffect(() => {
        fetch(`http://localhost:3008/post/${id}`).then(response => {
            response.json().then(postInfo => {
                setPostinfo(postInfo)
            })
        })
    },[])

    return(
       <>
        {postInfo && (
            <div className="post-page">
                <h1>{postInfo.title}</h1>
                <time>{format(new Date(postInfo.createdAt), 'd MMM, u')}</time>
                <div className="about-author my-3">
                    <div className="d-flex align-items-center">
                        <img className="author-img" src={'http://localhost:3008/'+postInfo.author.userImage} alt="" />
                        <div className="px-3 d-flex flex-column">
                            <span>{postInfo.author.fullName}</span>
                             <span>@{postInfo.author.userName}</span>
                        </div>
                    </div>
                </div>
                <div className="post-thumnail">
                    <img src={'http://localhost:3008/' + postInfo.postThumnail} alt="image" />
                </div>
                <div>
                    <div 
                        className="content"
                        dangerouslySetInnerHTML={{ __html: postInfo.postContent }}>
                    </div>
                </div>
             </div>
        )}
       </>
    )
}