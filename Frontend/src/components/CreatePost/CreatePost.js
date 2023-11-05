import { useContext, useState } from "react";
import Editor from "./Editor";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [navigate, setNavigate] = useState([false, "id"]);
  const [requireErr, setRequireErr] = useState(false)

  const { userInfo } = useContext(UserContext);
  const username = userInfo?.userName;

  // if (!username) {
  //   return <Navigate to={"/"} />;
  // }

  if (navigate[0]) {
    return <Navigate to={"/post/" + navigate[1]} />;
  }

  async function createNewPost(event, status) {
    // event.preventDefault();
    if (title && summary && (files?.length > 0)) {
      const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("postContent", postContent);
        data.set("file", files[0]);
        data.set("id", userInfo.id);
        data.set("status", status);
        
      await fetch("http://localhost:3008/createnewpost", {
        method: "POST",
        body: data,
        credentials: "include",
      }).then((response) => {
        response.json().then((data) => {
          setNavigate([true, data._id]);
        });
      });
    }
    else{
        setRequireErr(true)
    }
  }

  function checkLimit(event, limitNum, whereStore) {
    if (event.target.value.length <= limitNum) {
      whereStore(event.target.value);
    } else {
      toast(limitNum + " Characters Limit", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <form>
        <br />
        {requireErr && !title && <label className="text-danger">Title is requires</label>}
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(event) => checkLimit(event, 100, setTitle)}
        />
        <br />
        {requireErr && !summary && <label className="text-danger">Summary is requires</label>}
        <input
          type="summary"
          placeholder={"Summary"}
          value={summary}
          onChange={(event) => checkLimit(event, 300, setSummary)}
        />
        <br />
        {requireErr && !files?.length > 0 && (
          <label className="text-danger">Thumnail image is requires</label>
        )}
        <img src={files} alt="" />
        <input type="file" accept="image/png, image/gif, image/jpeg" onChange={(event) => setFiles(event.target.files)}  />
        <Editor onChange={setPostContent} value={postContent} />
        <a onClick={(event) => createNewPost(event,'Published')} type="button" className="btn btn-outline-success me-2" style={{ marginTop: "10px" }}>Publish Post</a>
        <a onClick={(event) => createNewPost(event,'Draft')} type="button" className="btn btn-outline-primary" style={{ marginTop: "10px" }}>Draft Post</a>
      </form>
    </>
  );
}
