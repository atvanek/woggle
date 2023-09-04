export function generateMoves(
	coordinates: number[],
	prev: string[]
): [string[], string[]] {
	const [x, y] = coordinates;
	const adjacentBlocks = new Set<string>();
	for (let i = x - 1; i < x + 2; i++) {
		if (i >= 0 && i <= 3) {
			for (let j = y - 1; j < y + 2; j++)
				if (j >= 0 && j <= 3 && !(i === x && j === y)) {
					adjacentBlocks.add(String([i, j]));
				}
		}
	}
	const possibleMoves = new Set(prev).add(String(coordinates));
	return [Array.from(possibleMoves), Array.from(adjacentBlocks)];
}
