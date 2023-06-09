import React, { useEffect, useContext } from 'react';
import Board from './Board.jsx';
import Nav from './Nav.jsx';
import '../main.scss';
import { useLocation } from 'react-router-dom';
import Rooms from './Rooms.jsx';
import Context from '../context.jsx';

function App() {
	const { user } = useContext(Context);

	return (
		<div className='flex column width-100'>
			<Nav />
			<div className='flex center-all'>
				<img src='/client/data/img/blocks.png' id='logo' className='m-10' />
				<h1 id='main-header'>Woggle</h1>
			</div>
			<div id='play-area' className='flex center'>
				<Rooms user={user === '' ? 'guest' : user} />
				<Board user={user} />
			</div>
		</div>
	);
}

export default App;
