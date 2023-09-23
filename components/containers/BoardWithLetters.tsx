import SERVER_URL from '@/utils/serverURL';
import { Letters } from '@/types/gameSliceTypes';
import Board from '../views/Board';

async function getLetters() {
	const res = await fetch(`${SERVER_URL}/letters`);
	const letters: Promise<Letters> = await res.json();
	return letters;
}

async function BoardWithLetters() {
	const letters = await getLetters();
	return <Board letters={letters} />;
}

export default BoardWithLetters;
