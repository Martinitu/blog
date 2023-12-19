import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import App from './App';
import Posts from './posts';
import CreatePost from './createPost';


const RouterComponent = () => {
  

  return (
    
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <App>
              {/* Use Outlet to render child routes */}
              <Outlet />
            </App>
          }
        >
          {/* The index route is now rendered inside the Outlet */}
          <Route index element={<Posts />} />
          <Route path="/createPost" element={<CreatePost />} />
      
        </Route>
      </Routes>
    </Router>
  
  );
};

export default RouterComponent;