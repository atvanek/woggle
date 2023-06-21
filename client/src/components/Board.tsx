import Row from './Row';
import { CircularProgress } from '@mui/material';
import Alerts from './Alerts';
import { BoardProps } from '../types';

function Board({ letters }: BoardProps) {
	const rows = letters.map((arr, i) => (
		<Row id={`row-${i + 1}`} row={i + 1} key={i + 1} letters={arr} />
	));
	return (
		<>
			<div id='block-container'>
				{letters?.length > 1 ? (
					rows
				) : (
					<div className='flex' style={{ height: '100%' }}>
						<CircularProgress sx={{ margin: 'auto' }} />
					</div>
				)}
			</div>
			<Alerts />
		</>
	);
}

export default Board;
