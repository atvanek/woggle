import generateLetters from '@/utils/generateLetters';
import Row from '@/components/Row';
import ResetButton from '@/components/ResetButton';
import Score from '@/components/Score';
import Alert from '@/components/Alert';
import TimeToggle from '@/components/TimeToggle';
import PlayWordButton from '@/components/PlayWordButton';

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
