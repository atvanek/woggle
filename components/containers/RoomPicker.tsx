'use client';

import { useState } from 'react';
import { Button } from '@mui/material';
import EmojiDialog from '../views/EmojiDialog';

function RoomPicker({ emojiData }: any) {
	const [open, setOpen] = useState(false);

	return (
		<div className='flex w-full justify-center'>
			<Button variant='contained' onClick={() => setOpen(true)}>
				Join Room
			</Button>
			<EmojiDialog data={emojiData} open={open} setOpen={setOpen} />
		</div>
	);
}

export default RoomPicker;
