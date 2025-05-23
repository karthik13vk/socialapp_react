// Post.js
import React from 'react';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
  if (!post) {

    return <div>Loading...</div>;
  }

  return (
    <article className="post">
      <Link to={`post/${post.id}`}>
        <h1>{post.title}</h1>
        <p className="postDate">{post.datetime}</p>
      </Link>
      <p className="postBody">
        {post.body.length <= 25 ? post.body : `${post.body.slice(0, 25)}...`}
      </p>

    </article>
  );
};

export default Post;
