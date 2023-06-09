import React, { useContext } from 'react';
import Context from '../context';

function Controls() {
	const { timed, timerStarted, validateWord, clearBoard } = useContext(Context);
	return (
		<div className='flex around m-10'>
			<button
				id='validate'
				className='button-size'
				onClick={validateWord}
				disabled={timed && !timerStarted}>
				Validate word
			</button>

			<button
				id='reset'
				className='button-size'
				onClick={() => {
					clearBoard();
				}}
				disabled={timed && !timerStarted}>
				Reset Word
			</button>
		</div>
	);
}

export default Controls;
