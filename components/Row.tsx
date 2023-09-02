import Block from "./Block";

function Row({ row, letters }) {
	const boxes = letters.map((letter, i) => {
		return (
			<Block
				letter={letter}
				id={String(i + (row - 1) * 4 + 1)}
				key={i + (row - 1) * 4 + 1}
			/>
		);
	});
	return <div className='row flex center-all'>{boxes}</div>;
}

export default Row;
