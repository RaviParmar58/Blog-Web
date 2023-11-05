import React, { useEffect, useState } from "react";
import './header.css';
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from "../Context/UserContext";
import toast, { Toaster } from "react-hot-toast";

function Header() {

  const {userInfo, setUserInfo} = useContext(UserContext)
  const [showw, setShoww] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3008/profile', {
      credentials: 'include'
    }).then(response => {
      response.json().then(userData => {
        setUserInfo(userData)
      })
    })
  }, [])

  const username = userInfo?.userName;
  const fullName = userInfo?.fullName;
  
  function logout(){
    fetch('http://localhost:3008/logout', {
      method: 'POST',
      credentials: 'include'
    }).then(response => {
      if(response.status === 200) {
        setUserInfo(null)
        toast('We will miss you ' + userInfo.fullName, {
          icon: '🙂',
        });
      }
      else{
        toast.error("Server error")
      }
    })
  }

  function clickCreatePost(event){
    event.preventDefault()
      toast('You need to login...', {
        icon: '😍',
      });
  }

  function showwDrop(){
    setShoww(!showw)
  }
  

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <nav className="py-md-4 navbar">
        <div className="d-flex align-items-center">
          <Link to={'/'} className="nav-logo">Ravi_Blog</Link>
        </div>
        <div className="nav-right">
          {/* <Link to={(username && '/create-post') || (!username && '/login')} className="btn write-post-btn" > */}
          <Link to={(username && '/create-post')} className="btn write-post-btn" onClick={!username && clickCreatePost}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Write Post
          </Link>
          <span className="pipe">|</span>
          {!username && (
          <>
            <Link to={'/login'} className="btn login-btn">Login</Link>
            <span className="pipe">|</span>
            <Link to={'/signup'} className="btn signup-btn">SignUp</Link>
          </>
          )}
          {username && (
            <>
              {/* <Link onClick={logout} className="btn signup-btn">Logout</Link> */}
              <Link className="btn noti-btn">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </Link>
              <span className="pipe">|</span>
              <a className="ms-3">
                <img onClick={showwDrop} className="header-user-image" src={'http://localhost:3008/' + userInfo.userImage} alt="" />
                <div>
                  {showw && <>
                    <Link to={'user/'+userInfo.id} className="btn">Profile</Link>
                    <Link to={'user/post/'+userInfo.id} className="btn">My post</Link>
                    <Link onClick={logout} className="btn signup-btn">Logout</Link>
                  </>}
                </div>
              </a>
            </>
            )
          }
        </div>
      </nav>
    </>
  );
}

export default Header;
