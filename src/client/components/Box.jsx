import React from 'react';

function Box({ letter, id, handleClick, className }) {
	return (
		<div
			id={id}
			onClick={handleClick}
			className={`${className} box flex center-all pointer`}>
			{letter}
		</div>
	);
}

export default Box;
