'use client';

import { useRootDispatch } from '@/redux/hooks';
import { MouseEventHandler } from 'react';

type BlockProps = {
	letter: string;
	id: string;
	validateBlock: MouseEventHandler<HTMLDivElement>;
};

function Block({ letter, id, validateBlock }: BlockProps) {
	return (
		<div className='scene cursor-pointer' onClick={validateBlock}>
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
