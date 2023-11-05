import React, { useEffect, useState } from "react";
import PostIndexPage from "./PostIndexPage";

function Home() {
  const [posts, setPosts] = useState("");

  useEffect(() => {
    fetch("http://localhost:3008/post").then((response) => {
      response.json().then((postData) => {
        setPosts(postData);
      });
    });
  }, []);

  return (
    <>
      <div className="nav-search ms-3">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input type="search" placeholder="search blog" />
      </div>
      {posts.length > 0 && posts.map((post) => <PostIndexPage {...post} />)}
    </>
  );
}

export default Home;
