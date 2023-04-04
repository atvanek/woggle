import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
	return (
		<nav id='nav' className='flex width-100'>
			<ul className='flex'>
				<Link to='/'>
					<li>Home</li>
				</Link>
				<Link to='/login'>
					<li>Login</li>
				</Link>
				<Link to='signup'>
					<li>Sign-Up</li>
				</Link>
			</ul>
		</nav>
	);
}

export default Nav;
