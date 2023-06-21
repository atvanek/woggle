import React from 'react';
import Context from '../context/context';
import { BoxProps } from '../types';

function Box({ letter, id }: BoxProps) {
	const { handleBoxClick } = React.useContext(Context)!;
	return (
		<div className='scene' onClick={() => handleBoxClick(id, letter)}>
			<div className='cube pointer' id={id}>
				<div className='cube__face cube__face--front flex center-all'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--back flex center-all'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--right flex center-all'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--left flex center-all'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--top flex center-all'></div>
				<div className='cube__face cube__face--bottom flex center-all'></div>
			</div>
		</div>
	);
}

export default Box;
