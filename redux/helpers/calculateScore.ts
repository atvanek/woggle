function calculateScore(word: string): number {
	let points: number;
	if (word.length < 5) {
		points = 1;
	} else if (word.length < 6) {
		points = 2;
	} else if (word.length < 7) {
		points = 3;
	} else if (word.length < 8) {
		points = 5;
	} else {
		points = 11;
	}

	return points;
}

export default calculateScore