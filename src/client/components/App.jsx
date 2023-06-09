import React, { useContext } from 'react';
import Home from '../pages/Home.jsx';
import Nav from './Nav.jsx';
import '../main.scss';
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
				<Home user={user} />
			</div>
		</div>
	);
}

export default App;
