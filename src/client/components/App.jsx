import React, { useContext } from 'react';
import Home from '../pages/Home.jsx';
import Nav from './Nav.jsx';
import '../main.scss';
import RoomPicker from './RoomPicker.jsx';
import Context from '../context/context';
import blocks from '../../img/blocks.png';

function App() {
	const { user } = useContext(Context);

	return (
		<div className='flex column width-100'>
			<Nav />
			<div className='flex center-all'>
				<img src={blocks} id='logo' className='m-10' />
				<h1 id='main-header'>Woggle</h1>
			</div>
			<div id='play-area' className='flex center'>
				<RoomPicker />
				<Home user={user} />
			</div>
		</div>
	);
}

export default App;
