'use client';
import { useRootSelector } from '@/redux/hooks';

function PlayedWords() {
	const { playedWords } = useRootSelector((state) => state.game);

	return (
		<div id='played-list' className='flex flex-col mx-24'>
			<h3 className='text-xl mb-10'>Played Words</h3>
			<div id='played-words'>
				{playedWords.map((word) => {
					return (
						<div key={word}>
							{word.split('').map((letter) => {
								return <span key={word + 'block'}>{letter}</span>;
							})}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default PlayedWords;
