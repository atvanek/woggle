import Row from '../views/Row';
import generateLetters from '@/utils/generateLetters';
function Board() {
	const letters = generateLetters();

	const rows = letters.map((arr, i) => (
		<Row id={`row-${i + 1}`} row={i + 1} key={i + 1} letters={arr} />
	));
	return rows;
}

export default Board;
