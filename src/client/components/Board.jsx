import React from 'react';
import { CircularProgress } from '@mui/material';

function Board({ rows, letters }) {
	return (
		<div id='block-container'>
			{letters.length > 1 ? (
				rows
			) : (
				<div className='flex' style={{ height: '100%' }}>
					<CircularProgress sx={{ margin: 'auto' }} />
				</div>
			)}
		</div>
	);
}

export default Board;
