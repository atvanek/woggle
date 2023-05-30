import React from 'react';
import { Link } from 'react-router-dom';

function Nav({ loggedIn, setLoggedIn, user, setUser }) {
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
						<Link to='/signup' state={user}>
							<li className='pointer'>Sign-Up</li>
						</Link>
					</>
				) : (
					<>
						<li>
							Welcome <span className='username'>{user}</span>
						</li>
						<li
							onClick={() => {
								console.log(user);
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
