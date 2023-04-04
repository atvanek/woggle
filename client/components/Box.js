import React from 'react';

function Box({ letter, id, handleClick, className }) {
	return (
		<div
			id={id}
			onClick={handleClick}
			className={`${className} box border flex center-all`}>
			{letter}
		</div>
	);
}

export default Box;
