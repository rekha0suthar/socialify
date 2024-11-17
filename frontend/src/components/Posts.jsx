import React, { useContext, useEffect } from 'react';
import PostForm from './PostForm';
import '../styles/posts.css';
import { Context } from '../context/Context';
import Post from './Post';
const Posts = () => {
  const { posts, getFeedPosts } = useContext(Context);
  useEffect(() => {
    getFeedPosts();
  }, []);
  return (
    <div className="post-container">
      <PostForm />
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
