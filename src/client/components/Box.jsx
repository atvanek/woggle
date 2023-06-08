import React from 'react';

function Box({ letter, id, handleClick, className }) {
	return (
		// <></>
		// <div
		// 	id={id}
		// 	onClick={handleClick}
		// 	className={`${className} box flex center-all pointer`}>
		// 	{letter}
		// </div>

		<div class='scene'>
			<div class='cube pointer' onClick={handleClick}>
				<div class='cube__face cube__face--front flex center-all'>{letter}</div>
				<div class='cube__face cube__face--back flex center-all'>{letter}</div>
				<div class='cube__face cube__face--right flex center-all'>{letter}</div>
				<div class='cube__face cube__face--left flex center-all'>{letter}</div>
				<div class='cube__face cube__face--top flex center-all'></div>
				<div class='cube__face cube__face--bottom flex center-all'></div>
			</div>
		</div>
	);
}

export default Box;
