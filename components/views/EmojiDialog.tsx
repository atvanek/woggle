'use client';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Button,
} from '@mui/material';
import Picker from '@emoji-mart/react';
import { Dispatch, SetStateAction, useState, MouseEvent } from 'react';

type EmojiDialogProps = {
	data: JSX.Element;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

interface EmojiClickEvent extends MouseEvent {
	native: string;
}

function EmojiDialog({ data, open, setOpen }: EmojiDialogProps) {
	const [emoji, setEmoji] = useState('');
	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>Choose your Room</DialogTitle>
			<DialogContent>
				<DialogContentText>Select an emoji to pick a room!</DialogContentText>
				<Picker
					data={data}
					onEmojiSelect={({ native }: EmojiClickEvent) => setEmoji(native)}
				/>
				<DialogContent>Room: {emoji}</DialogContent>
				<Button variant='contained' disabled={!emoji}>
					Join Room {emoji}
				</Button>
			</DialogContent>
		</Dialog>
	);
}

export default EmojiDialog;
