import Row from './Row';
import { Letters } from '@/types/gameSliceTypes';

function Grid({ letters }: { letters: Letters }) {
	const rows = letters.map((arr, i) => (
		<Row id={`row-${i + 1}`} row={i + 1} key={i + 1} letters={arr} />
	));
	return rows;
}

export default Grid;
