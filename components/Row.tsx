import Block from './Block';
import BlockContainer from '@/components/containers/BlockContainer';

type RowProps = {
	row: number;
	letters: string[];
	id: string;
};

function Row({ row, letters }: RowProps) {
	const boxes = letters.map((letter, i) => {
		return (
			<BlockContainer
				letter={letter}
				id={String(i + (row - 1) * 4 + 1)}
				key={i + (row - 1) * 4 + 1}
			/>
		);
	});
	return <div className='row flex center-all'>{boxes}</div>;
}

export default Row;
