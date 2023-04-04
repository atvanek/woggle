import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ loggedIn, setLoggedIn, user, setUser }) {
	return (
		<nav id='nav' className='flex width-100'>
			<ul className='flex'>
				<Link to='/' state={JSON.stringify({ setLoggedIn })}>
					<li>Home</li>
				</Link>
				{!loggedIn ? (
					<>
						<Link to='/login'>
							<li>Login</li>
						</Link>
						<Link to='/signup' state={user}>
							<li>Sign-Up</li>
						</Link>
					</>
				) : (
					<>
						<li>Welcome, {user}</li>
						<li
							onClick={() => {
								console.log(user);
								setLoggedIn(false);
								setUser('');
							}}>
							Logout
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Nav;
