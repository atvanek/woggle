import blocks from './blocks';

export default function generateLetters() {
	const blocksCopy = [...blocks];
	const lettersGrid: Array<string[]> = [];
	let column = 0;
	let row = 0;
	let id = 1;
	let currentRow: string[] = [];
	while (blocksCopy.length) {
		const randomIndex = Math.floor(Math.random() * blocksCopy.length);
		const randomBlock = blocksCopy[randomIndex];
		const randomLetterIndex = Math.floor(Math.random() * 6);
		currentRow.push(randomBlock[randomLetterIndex]);
		blocksCopy.splice(randomIndex, 1);
		column++;
		id++;
		if (column === 4) {
			lettersGrid.push(currentRow);
			currentRow = [];
			column = 0;
			row++;
		}
	}
	return lettersGrid;
}
