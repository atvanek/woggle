import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <SignUp /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
