import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App'

import RouterComponent from './Router';
import './index.css'
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider } from './AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
   
    <ErrorBoundary>
      
      <RouterComponent />
    </ErrorBoundary>
  </React.StrictMode>
)
