'use client';

import { validateBlock } from '@/redux/slices/gameSlice';
import { useRootDispatch } from '@/redux/hooks';

type BlockProps = {
	letter: string;
	id: string;
};

function Block({ letter, id }: BlockProps) {
	const dispatch = useRootDispatch();
	console.log('block')
	return (
		<div
			className='scene cursor-pointer'
			onClick={() => dispatch(validateBlock({ letter, id }))}>
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
