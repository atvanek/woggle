import Alert from '../views/Alert';
import Score from '../views/Score';
import Buttons from './Buttons';
import Grid from '../views/Grid';
import { Letters } from '@/types/gameSliceTypes';

function Board({ letters }: { letters: Letters }) {
	return (
		<>
			<Grid letters={letters} />
			<Buttons />
			<Score />
			<Alert />
		</>
	);
}

export default Board;
