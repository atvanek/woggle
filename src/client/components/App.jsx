import React from 'react';
import Board from './Board.jsx';
import Nav from './Nav.jsx';
import '../main.scss';
import { useLocation } from 'react-router-dom';
import Rooms from './Rooms.jsx';

function App() {
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [user, setUser] = React.useState('');
	const location = useLocation();

	//if coming from login/sign-up, pass username to app
		//passes to nav, board, and rooms
	React.useEffect(() => {
		if (location.state?.user && location.state?.loggedIn) {
			const { user } = location.state;
			setUser(user);
			setLoggedIn(true);
		}
	}, [location]);

	return (
		<div className='flex column width-100'>
			<Nav
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
				user={user}
				setUser={setUser}
			/>
			<div className='flex center-all'>
				<img src='../data/img/blocks.png' id='logo' className='m-10' />
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