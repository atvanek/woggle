import React from 'react';
import Board from './Board';
import '../main.scss';
import { Link } from 'react-router-dom';

function App() {
	return (
		<>
			<Board />
			<Link to='/login'>
				<p>Login</p>
			</Link>
		</>
	);
}

export default App;
