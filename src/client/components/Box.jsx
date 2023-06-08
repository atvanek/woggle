import React from 'react';

function Box({ letter, id, handleClick, className }) {
	const test = (e) => {
		console.log(e.target.classList);
	};
	return (
		// <></>
		// <div
		// 	id={id}
		// 	onClick={handleClick}
		// 	className={`${className} box flex center-all pointer`}>
		// 	{letter}
		// </div>

		<div class='scene' onClick={() => handleClick(id, letter)}>
			<div class='cube pointer' id={id}>
				<div class='cube__face cube__face--front flex center-all'>
					<p>{letter}</p>
				</div>
				<div class='cube__face cube__face--back flex center-all'>
					<p>{letter}</p>
				</div>
				<div class='cube__face cube__face--right flex center-all'>
					<p>{letter}</p>
				</div>
				<div class='cube__face cube__face--left flex center-all'>
					<p>{letter}</p>
				</div>
				<div class='cube__face cube__face--top flex center-all'></div>
				<div class='cube__face cube__face--bottom flex center-all'></div>
			</div>
		</div>
	);
}

export default Box;
