import React, { useContext } from 'react'
import { Link, useParams  } from 'react-router-dom'
import DataContext from '../context/DataContext';

const PostPage = () => {
  const {posts, handleDelete} = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post &&
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">
              {post.body}
            </p>
            <Link>
              
            </Link>
            <button  className='deleteButton' onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
           
            <Link to={`/edit/${post.id}`}>
            <button  className='editButton'>
              Edit
            </button>
              </Link>
          </>
        }
        {!post &&
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's disappointing</p>
            <p className="postBody">
              <Link to="/"> Visit Our HomePage</Link>
            </p>
          </>
        }
      </article>

    </main>
  )
}

export default PostPage