import React from 'react';
import { Link } from 'react-router-dom';

function Rooms({ user }) {
	return (
		<section id='rooms' className='flex column p-10'>
			<h3>Join a room</h3>
			<div className='p-10 flex column center-all'>
				<Link to='/room/1' state={{ user }}>
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
				<Link to='/room/2' state={{ user }}>
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
				<Link to='/room/3' state={{ user }}>
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
				<Link to='/room/4' state={{ user }}>
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
			</div>
		</section>
	);
}

export default Rooms;
