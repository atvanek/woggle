import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/context';

function Nav() {
	const { loggedIn, setLoggedIn, user, setUser } = useContext(Context)!;
	return (
		<nav id='nav' className='flex width-100'>
			<ul className='flex'>
				<Link to='/' state={JSON.stringify({ setLoggedIn })}>
					<li className='pointer'>Home</li>
				</Link>
				{!loggedIn ? (
					<>
						<Link to='/login'>
							<li className='pointer'>Login</li>
						</Link>
						<Link to='/signup'>
							<li className='pointer'>Sign-Up</li>
						</Link>
					</>
				) : (
					<>
						<li>
							Welcome, <span className='username'>{user}</span>
						</li>
						<li
							onClick={() => {
								setLoggedIn(false);
								setUser('');
							}}
							className='pointer'>
							Logout
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Nav;
