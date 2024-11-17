import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_API_URL = 'http://localhost:7000/api';

const Context = createContext({});

const ContextProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [isFriend, setIsFriend] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  // Method for Signup user --- input: name, username, password
  const signup = async (e) => {
    // preventing page from refresh
    e.preventDefault();

    // Signup User object
    const newUser = { name, username, password };

    try {
      // setting loading true until we back response
      setLoading(true);

      // calling api and store response
      const response = await axios.post(
        `${BASE_API_URL}/auth/signup`,
        newUser,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      toast.success(response.data.msg); // success alert
      navigate('/'); // redirect to login page
      setLoading(false); //setting loading false
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.msg || 'Signup failed';
      toast.error(errorMsg); // show specific error message if available
    }
  };

  // Method for login --- input: username and password
  const login = async (e) => {
    // preventing page from refresh
    e.preventDefault();

    const newUser = { username, password };

    try {
      // setting loading true until we back response
      setLoading(true);
      const response = await axios.post(`${BASE_API_URL}/auth/login`, newUser, {
        headers: { 'Content-Type': 'application/json' },
      });

      toast.success(response.data.msg); // success alert
      localStorage.setItem('token', response.data.token); // storing token in localstorage
      localStorage.setItem('userId', response.data.user._id);
      navigate('/dashboard'); // redirecting to dashboard after successfull login
    } catch (err) {
      console.error(err);
      toast.error('Incorrect username/password'); // error alert
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  // Method for logout
  const logout = () => {
    localStorage.removeItem('token'); // removing token from localstorage
    navigate('/'); // redirecting to login after logout
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const addPost = async () => {
    try {
      const response = await axios.post(
        `${BASE_API_URL}/posts/`,
        { userId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setContent('');
      getFeedPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const getFeedPosts = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/posts/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const likeOrUnlikePost = async (postId) => {
    try {
      // Send the PUT request to like/unlike the post
      const response = await axios.put(
        `${BASE_API_URL}/posts/${postId}/like`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Get the updated post from the server response
      const updatedPost = response.data;

      // Optionally update the specific post in the feed without re-fetching everything
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === updatedPost._id ? updatedPost : post
        )
      );
    } catch (err) {
      console.error('Error toggling like:', err.message);
    }
  };

  return (
    <Context.Provider
      value={{
        name,
        setName,
        username,
        setUsername,
        password,
        setPassword,
        content,
        setContent,
        posts,
        setPosts,
        loading,
        setLoading,
        signup,
        login,
        logout,
        user,
        setUser,
        getUser,
        addPost,
        getFeedPosts,
        likeOrUnlikePost,

        isFriend,
        setIsFriend,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
