import Home from '../pages/Home';
import Nav from './Nav';
import '../../main.scss';
import RoomPicker from './RoomPicker';
import blocks from '../img/blocks.png';

function App() {
	return (
		<div className='flex column width-100'>
			<Nav />
			<div className='flex center-all'>
				<img src={blocks} id='logo' className='m-10' />
				<h1 id='main-header'>Woggle</h1>
			</div>
			<div id='play-area' className='flex center'>
				<RoomPicker />
				<Home />
			</div>
		</div>
	);
}

export default App;
