import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import UsersPage from './pages/UsersPage.tsx';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/users', element: <UsersPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
