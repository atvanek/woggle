import Box from './Box';
import { RowProps } from '../types';

function Row({ row, letters }: RowProps) {
	const boxes = letters.map((letter, i) => {
		return (
			<Box
				// className={`row-${row} column-${i + 1}`}
				letter={letter}
				id={String(i + (row - 1) * 4 + 1)}
				key={i + (row - 1) * 4 + 1}
			/>
		);
	});
	return <div className='row flex center-all'>{boxes}</div>;
}

export default Row;
