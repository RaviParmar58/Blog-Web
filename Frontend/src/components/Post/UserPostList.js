import { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "./PostPage.css";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { UserContext } from "../Context/UserContext";

function UserPostList() {
  const { userInfo } = useContext(UserContext);
  const [userPosts, setUserPosts] = useState([]);
  const [navigate, setNavigate] = useState(false);
  const [deletee, setDeletee] = useState(false);
  const param = useParams();

  useEffect(() => {
    fetch(`http://localhost:3008/user/post/${param.id}`).then((response) => {
      response.json().then((data) => {
        setUserPosts(data);
      });
    });
  }, [deletee]);

  const userName = userInfo?.userName;

  if (navigate) {
    return <Navigate to={"/"} />;
  }

  if (!userName) {
    setNavigate(true);
  }

  function deletePost(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete this post",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3008/delet-post/" + id, {
          method: "DELETE",
        }).then((response) =>
          response.json().then((deleteResponse) => {
            if (deleteResponse.deletedCount === 1) {
              toast.success("Deleted successfully!");
              setDeletee(true);
            }
          })
        );
      }
    });
  }

  return (
    <>
      {userPosts.length === 0 && <h1>No Post Yet</h1>}
      {userPosts.length > 0 && (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
              <th scope="col">Like</th>
              <th scope="col">Comment</th>
              <th scope="col">Created</th>
              <th scope="col">Last updated</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userPosts?.map((data) => (
              <tr>
                <td>{data.title}</td>
                <td onClick={() => console.log(data._id)}>{data.status}</td>
                <td>50</td>
                <td>10</td>
                <td>5</td>
                <td>{format(new Date(data.createdAt), "d LLL, u")}</td>
                <td>{format(new Date(data.updatedAt), "d LLL, u")}</td>
                <td className="edit-icon">
                  <Link to={'/edit-post/'+data._id}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </Link>
                </td>
                <td className="delete-icon" onClick={() => deletePost(data._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default UserPostList;
