export function generateMoves(
	coordinates: number[],
	prev: Set<string>
): [Set<string>, Set<string>] {
	const [x, y] = coordinates;
	const adjacent = new Set<string>();
	for (let i = x - 1; i < x + 2; i++) {
		if (i >= 0 && i <= 3) {
			for (let j = y - 1; j < y + 2; j++)
				if (j >= 0 && j <= 3 && !(i === x && j === y)) {
					adjacent.add(String([i, j]));
				}
		}
	}
	const moves = new Set(prev).add(String(coordinates));
	return [moves, adjacent];
}
