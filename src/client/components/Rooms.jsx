import React from 'react';
import { Link } from 'react-router-dom';

function Rooms() {
	return (
		<section id='rooms' className='flex column p-10'>
			<h3>Join a room</h3>
			<div id='room-button-container' className='p-10 flex column center-all'>
				<Link to='/room/1'>
					<button>Room 1</button>
				</Link>
				<Link to='/room/2'>
					<button>Room 2</button>
				</Link>
				<Link to='/room/3'>
					<button>Room 3</button>
				</Link>
				<Link to='/room/4'>
					<button>Room 4</button>
				</Link>
			</div>
		</section>
	);
}

export default Rooms;
