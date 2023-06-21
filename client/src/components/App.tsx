import { useContext } from 'react';
import Home from '../pages/Home';
import Nav from './Nav';
import '../../main.scss';
import RoomPicker from './RoomPicker';
import Context from '../context/context';
import blocks from '../img/blocks.png';

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
