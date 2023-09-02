'use client';

import { selectLetter } from '@/redux/slices/gameSlice';
import { useDispatch } from 'react-redux';

type BlockProps = {
	letter: string;
	id: string;
};

function Block({ letter, id }: BlockProps) {
	const dispatch = useDispatch();
	function handleBlockClick() {
		dispatch(selectLetter({ letter, id }));
	}
	return (
		<div className='scene cursor-pointer' onClick={handleBlockClick}>
			<div className='cube' id={id}>
				<div className='cube__face cube__face--front flex justify-center items-center'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--back flex justify-center items-center'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--right flex justify-center items-center'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--left flex justify-center items-center'>
					<p>{letter}</p>
				</div>
				<div className='cube__face cube__face--top flex justify-center items-center'></div>
				<div className='cube__face cube__face--bottom flex justify-center items-center'></div>
			</div>
		</div>
	);
}

export default Block;
