'use client';

import generateLetters from '@/utils/generateLetters';
import Row from '@/components/Row';
import ResetButton from '@/components/ResetButton';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from '@/redux/store';

export default function Home() {
	const word = useSelector((state: RootState) => state.game.currentWord);

	const letters = generateLetters();
	const handleClick = () => {
		fetch('/api/validateWord', {
			method: 'POST',
			body: JSON.stringify({ word }),
			headers: {
				'Content-Type': 'application/json',
			},
		});
	};

	const rows = letters.map((arr, i) => (
		<Row id={`row-${i + 1}`} row={i + 1} key={i + 1} letters={arr} />
	));
	return (
		<main>
			{rows}
			<button onClick={handleClick}>Play Word</button>
			<ResetButton />
		</main>
	);
}
