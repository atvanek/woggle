import { useContext } from 'react';
import Context from '../context/context';

function Played() {
	const { playedWords } = useContext(Context)!;
	return (
		<section id='played-list' className='flex column p-10'>
			<h3>Played words</h3>
			<div id='played-words'>
				{[...playedWords].map((word) => {
					return (
						<div className='played-box-container'>
							{word.split('').map((letter) => {
								return <span className='played-box center-all'>{letter}</span>;
							})}
						</div>
					);
				})}
			</div>
		</section>
	);
}

export default Played;
