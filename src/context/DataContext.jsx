import { createContext, useState, useEffect } from 'react';

// import PostLayout from "./components/PostLayout";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import api from "../api/posts";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxoisFetch";


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
     const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setsearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const navigate = useNavigate();
  const {width} = useWindowSize();
  const {data, fetchError, isLoading}= useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data]);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error: ${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setsearchResults(filteredResults.reverse());
  }, [posts, search]);
  const getNextId = () => {
    const numericIds = posts
      .map((post) => parseInt(post.id)) // convert string ID to number
      .filter((id) => !isNaN(id)); // remove any bad data

    const nextId = numericIds.length ? Math.max(...numericIds) + 1 : 1;
    return nextId.toString(); // convert back to string
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = getNextId().toString();
    const datetime = format(new Date(), " MM-dd,yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  const handleEdit = async (id) => {
    const datetime = format(new Date(), " MM-dd,yyyy pp");
    const updatePost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatePost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      navigate("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
 
    
    return (
        <DataContext.Provider value={{
           width, search,  setSearch, searchResults, fetchError, isLoading,
           handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
           posts, handleEdit, editTitle, setEditTitle, editBody, setEditBody,
           handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;