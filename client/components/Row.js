import React from 'react';
import Box from './Box';

function Row({ row, letters, handleClick }) {
	const boxes = letters.map((letter, i) => {
		return (
			<Box
				className={`row-${row} column-${i + 1}`}
				letter={letter}
				id={i + (row - 1) * 4 + 1}
				key={i + (row - 1) * 4 + 1}
				handleClick={handleClick}
			/>
		);
	});
	return <div className='row flex'>{boxes}</div>;
}

export default Row;
