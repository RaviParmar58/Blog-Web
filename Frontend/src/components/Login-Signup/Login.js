import { useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import "./login-signup.css";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let [requireError, setRequireError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  let [showPassword, setShowPassword] = useState(false);

  const {setUserInfo} = useContext(UserContext)

  async function loginFun(event) {
    event.preventDefault();

    if (!userName || !password) {
      setRequireError(true);
    }

    if (userName && password) {
      const response = await fetch("http://localhost:3008/login", {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if(response.ok){
        response.json().then(userData => {
          setUserInfo(userData)
          setRedirect(true)
        })
        toast.success('Login Success');
      }
      else{
        response.json().then(response => {  
          toast.error(response);
        })
      }
    }
  }

  if(redirect){
    return <Navigate to={'/'}/>
  }

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      <form onSubmit={loginFun}>
        <div className="inputfield">
          <label>Username*</label>
          {requireError && !userName && (
            <label className="text-danger">Username require</label>
          )}
          <input
            type="text"
            value={userName}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="inputfield">
          <label>Password*</label>
          {requireError && !password && (
            <label className="text-danger">Password require</label>
          )}
          <div>
          <input
            type={showPassword? 'text': 'password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <span className="pass-eye ms-1" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              )}
            </span>
          </div>
          
        </div>
        <p className="mt-3">Don't have an account <Link to={'/signup'} className="text-primary text-underline"><u>Signup</u></Link></p>
        <button>Login</button>
      </form>
    </>
  );
}

export default Login;
