import React, { useState, useEffect } from 'react';
import './App.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please try again later.</p>;
    }

    return this.props.children;
  }
}

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://localhost:3000/blog/', { mode: 'cors' })
      .then(response => response.json())
      .then(data => setPosts(data.filter(post => post.visible)))
      .catch(error => console.error('Error fetching data:', error));
  }, []); 

  const Commentslist = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentFormData, setCommentFormData] = useState({
      name: '',
      text: ''
    });

    useEffect(() => {
      // Fetch data when the component mounts and when postId changes
      fetch(`http://localhost:3000/blog/post/${postId}/comments`, { mode: 'cors' })
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.error('Error fetching data:', error));
    }, [postId]);

    const handleCommentChange = (e) => {
      setCommentFormData({
        ...commentFormData,
        [e.target.name]: e.target.value
      });
    };

    const handleCommentSubmit = (e) => {
      e.preventDefault();

      fetch(`http://localhost:3000/blog/post/${postId}/comment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentFormData),
      })
        .then(response => response.json())
        .then(() => {
          // Fetch comments again after submitting the new comment
          fetch(`http://localhost:3000/blog/post/${postId}/comments`, { mode: 'cors' })
            .then(response => response.json())
            .then(data => setComments(data))
            .catch(error => console.error('Error fetching data:', error));

          setCommentFormData({
            name: '',
            text: ''
          });
        })
        .catch(error => console.error('Error creating comment:', error));
    };

    const visibleComments = comments.map(comment => (
      <li  className='comment' key={comment.id}>
        <p className='commentName'>{comment.name}</p>
         <p className='commentText'>{comment.text}</p>
      </li>
    ));

    return (
      <div className='comments'>
        <p>Leave your comment</p>
        <form className='commentForm' onSubmit={handleCommentSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" value={commentFormData.name} onChange={handleCommentChange} />
          <label htmlFor="text">Comment:</label>
          <input className='commentTextInput' type="text" name="text" value={commentFormData.text} onChange={handleCommentChange} />
          <button className='button-13' type="submit">Submit</button>
        </form>
        <h3>Comments:</h3>
        <div >
        <ul className='commentsUl'>{visibleComments}</ul>
        </div>
      </div>
    );
  };

  const postlist = posts.map(post => {
    const postId = post._id;
    const date = new Date(Date.parse(post.timestamp)).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
      <div className='post' key={postId}>
        <h2 className='postTitle'>{post.title}</h2>
       
        <p className="postText">{post.text}</p>
       
        <p>{date}</p>
        <div className='comments'>
         
          <Commentslist postId={postId} />
        </div>
      </div>
    );
  });

  return (
    <ErrorBoundary>
      <div>
       
        {postlist}
      </div>
    </ErrorBoundary>
  );
}

export default Posts;