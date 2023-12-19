import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <>
      <div className="header">
        <h1>Babylon Fall Sound Blog</h1>
      </div>

      <div>
        <h2>Reggae and Dancehall History</h2>
        <h3>Learn about the history of reggae and dancehall sound systems</h3>
        <ul>
          <li>
            {/* Use the Link component to navigate to the specified route */}
            <Link className='link' to="/">See Posts</Link>
          </li>
          <li>
            {/* Use the Link component to navigate to the specified route */}
            <Link className='link' to="/createPost">Create a Post</Link>
          </li>
        </ul>
      </div>

      {/* Render nested content based on the route */}
      <Outlet />
    </>
  );
}

export default App;