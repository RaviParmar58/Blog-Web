import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Editor from "./Editor";

export default function EditPost() {

    const [postData, setPostData] = useState('');
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [thumnail, setThumnail] = useState('');
    const [postContent, setPostContent] = useState('');

    const param = useParams();

    useEffect(() => {
        fetch('http://localhost:3008/post/'+param.id).then(response => {
            response.json().then(data => {
                setTitle(data.title);
                setSummary(data.summary);
                setPostContent(data.postContent)
                // setThumnail(data.thumnail);
            })
        })
    }, []);

    return(
        <>
            <input type="text" placeholder="Title" value={title}
                    onChange={event => setTitle(event.target.value)} />
            <input type="text" placeholder="Summary" value={summary} 
                    onChange={event => setSummary(event.target.value)} />
            <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(event) => setThumnail(event.target.files)}/>
            {/* <img src={thumnail} alt="" /> */}
            <Editor onChange={setPostContent} value={postContent} />
            <a  type="button" className="btn btn-outline-success me-2" style={{ marginTop: "10px" }}>Publish Post</a>
            <a  type="button" className="btn btn-outline-primary" style={{ marginTop: "10px" }}>Draft Post</a>
        </>
    )
}