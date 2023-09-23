'use client';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Button,
	CircularProgress,
} from '@mui/material';
import Picker from '@emoji-mart/react';
import { Dispatch, SetStateAction, useState, MouseEvent } from 'react';

type EmojiDialogProps = {
	data: JSX.Element;
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};
import { useRouter } from 'next/navigation';

interface EmojiClickEvent extends MouseEvent, Emoji {}

interface Emoji {
	native: string;
	name: string;
	id: string;
}

const initialEmoji = {
	native: '',
	name: '',
	id: '',
};

function EmojiDialog({ data, open, setOpen }: EmojiDialogProps) {
	const [emoji, setEmoji] = useState<Emoji>(initialEmoji);
	const [navigating, setNavigating] = useState<boolean>(false);
	const router = useRouter();
	function handleClose() {
		setEmoji(initialEmoji);
		setOpen(false);
	}
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>Choose your Room</DialogTitle>
			<DialogContent>
				<DialogContentText>Select an emoji to pick a room!</DialogContentText>
				<Picker
					data={data}
					onEmojiSelect={({ native, name, id }: EmojiClickEvent) => {
						setEmoji({ native, name, id });
					}}
				/>
				<DialogContent>Room: {emoji.native}</DialogContent>
				<Button
					variant='contained'
					disabled={!emoji.native}
					onClick={() => {
						setNavigating(true);
						router.push(`/room/${emoji.native}`);
					}}>
					<CircularProgress sx={{ width: 20 + 'px', height: 20 + 'px' }} />
					JOIN ROOM {navigating ? <CircularProgress /> : emoji.native}
				</Button>
			</DialogContent>
		</Dialog>
	);
}

export default EmojiDialog;
