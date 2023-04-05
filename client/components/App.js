import React from 'react';
import Board from './Board';
import Nav from './Nav';
import '../main.scss';
import { useLocation } from 'react-router-dom';

function App() {
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [user, setUser] = React.useState('');
	const location = useLocation();
	React.useEffect(() => {
		if (location.state?.user && location.state?.loggedIn) {
			const { user } = location.state;
			setUser(user);
			setLoggedIn(true);
		}
	}, [location]);

	return (
		<>
			<Nav
				loggedIn={loggedIn}
				setLoggedIn={setLoggedIn}
				user={user}
				setUser={setUser}
			/>
			<h1>Woggle</h1>
			<Board />
		</>
	);
}

export default App;
