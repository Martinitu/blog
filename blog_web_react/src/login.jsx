import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setLoggedIn } = useAuth();

  const handleLogin = async () => {
    try {
      // Perform login logic

      // If login is successful, update the global state
      setLoggedIn(true);

      // Redirect to create post page
      navigate('/createPost');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        {/* Your login form fields */}
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;