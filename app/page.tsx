import generateLetters from '@/utils/generateLetters';
import Row from '@/components/views/Row';
import ResetButton from '@/components/views/ResetButton';
import PlayWordContainer from '@/components/containers/PlayWordContainer';
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
			<PlayWordContainer />
			<ResetButton />
			<Score />
			<Alert />
		</main>
	);
}
