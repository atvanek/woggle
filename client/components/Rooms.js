import React from 'react';
import { Link } from 'react-router-dom';

function Rooms() {
	return (
		<section id='rooms' className='flex border column'>
			<h3>Join a room</h3>
			<Link to='/room/1'>
				<button
					onClick={(e) => {
						fetch('api/room/1')
							.then((res) => {
								return res.json();
							})
							.then((data) => {
								console.log(data);
							});
					}}>
					Room 1
				</button>
			</Link>
			<Link to='/room/2'>
				<button
					onClick={(e) => {
						fetch('api/room/2')
							.then((res) => {
								return res.json();
							})
							.then((data) => {
								console.log(data);
							});
					}}>
					Room 2
				</button>
			</Link>
			<Link to='/room/3'>
				<button
					onClick={(e) => {
						fetch('api/room/3')
							.then((res) => {
								return res.json();
							})
							.then((data) => {
								console.log(data);
							});
					}}>
					Room 3
				</button>
			</Link>
			<Link to='/room/4'>
				<button
					onClick={(e) => {
						fetch('api/room/4')
							.then((res) => {
								return res.json();
							})
							.then((data) => {
								console.log(data);
							});
					}}>
					Room 4
				</button>
			</Link>
		</section>
	);
}

export default Rooms;
