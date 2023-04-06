import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import Room from './pages/Room';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//defines routes
const router = createBrowserRouter([
	{ path: '/', element: <App /> },
	{ path: '/home', element: <App /> },
	{ path: '/login', element: <Login /> },
	{ path: '/signup', element: <SignUp /> },
	{ path: '/room/:id', element: <Room /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
