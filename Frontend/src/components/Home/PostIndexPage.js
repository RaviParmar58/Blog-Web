import React from 'react'
import './PostIndexPage.css'
import { format, formatISO9075 } from 'date-fns'
import {Link} from 'react-router-dom'

function PostIndexPage ({_id, title, summary, postThumnail, author, createdAt, }){

    return(
        <>
            <div className='row all-post-section'>
                <div className='col-md-3 blog-image'>
                    <Link to={`post/${_id}`}>
                        <img src={"http://localhost:3008/"+ postThumnail} alt="" />
                    </Link>
                </div>
                <div className='col-md-9'>
                    <div className='author-info'>
                        <img src={'http://localhost:3008/'+author.userImage} alt="" />
                        <span>{author.fullName}</span>
                    </div>
                    <Link to={`post/${_id}`}>
                        <h1 className='post-title'>{title}</h1>
                    </Link>
                    <p className='post-short-info'>{summary}</p>
                    <time>{format(new Date(createdAt), 'd MMM, u')}</time>
                </div>
            </div>
        </>
    )
}

export default PostIndexPage