import generateLetters from '@/utils/generateLetters';
import Row from '@/components/views/Row';
import ResetButton from '@/components/views/ResetButton';
import PlayWordButton from '@/components/views/PlayWordButton';
import Score from '@/components/views/Score';
import Alert from '@/components/views/Alert';
import TimeToggle from '@/components/views/TimeToggle';

export default function Home() {
	const letters = generateLetters();

	const rows = letters.map((arr, i) => (
		<Row id={`row-${i + 1}`} row={i + 1} key={i + 1} letters={arr} />
	));
	return (
		<main>
			<TimeToggle />
			{rows}
			<PlayWordButton />
			<ResetButton />
			<Score />
			<Alert />
		</main>
	);
}
