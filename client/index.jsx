import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/components/App.jsx';
import Login from './src/pages/Login.jsx';
import SignUp from './src/pages/SignUp.jsx';
import Room from './src/pages/Room.jsx';
import { ContextProvider } from './src/context/context.jsx';

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
root.render(
	<ContextProvider>
		<RouterProvider router={router} />
	</ContextProvider>
);
