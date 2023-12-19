import React, { useState, useEffect } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function CreatePost () {

        const navigate = useNavigate();
        const [posts, setPosts] = useState([]);
        const [postFormData, setPostFormData] = useState({
          title: '',
          text: ''
        });


    const handlePostChange = (e) => {
        setPostFormData({
          ...postFormData,
          [e.target.name]: e.target.value
        });
      };
  
      const handlePostSubmit = (e) => {
        e.preventDefault();
  
        fetch(`http://localhost:3000/blog//createpost`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postFormData),
        })
          .then(response => response.json())
          .then(() => {
            // Fetch comments again after submitting the new comment
            fetch(`http://localhost:3000/blog/`, { mode: 'cors' })
              .then(response => response.json())
              .then(data => setPosts(data))
              .catch(error => console.error('Error fetching data:', error));
  
            setPostFormData({
              name: '',
              text: ''
            });
            navigate('/');
          })
          .catch(error => console.error('Error creating comment:', error));
      };
  




    return (

        <div className='createPost'>
            <h3>Create a Post</h3>
            <form onSubmit={handlePostSubmit}>
                <label htmlFor="title">Title:</label>
                <input className='commentForm' type="text" name="title" value={postFormData.title} onChange={handlePostChange} />
                <label htmlFor="text">Post:</label>
                <input className='commentTextInput' type="text" name="text" value={postFormData.text} onChange={handlePostChange} />
                <button className='button-13' type="submit">Submit</button>
            </form>
        </div>

    )

    

    
}

export default CreatePost