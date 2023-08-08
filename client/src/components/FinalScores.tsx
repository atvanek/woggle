import { useNavigate } from 'react-router-dom';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
} from '@mui/material';
import { FinalScoresProps } from '../types/types';
import { useContext } from 'react';
import Context from '../context/context';

function FinalScores({ message }: FinalScoresProps) {
	const navigate = useNavigate();
	const { open, setOpen } = useContext(Context)!;
	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle>Game Over</DialogTitle>
			<DialogContent>
				<DialogContentText>{message}</DialogContentText>
				<button onClick={() => navigate('/')}>OK</button>
			</DialogContent>
		</Dialog>
	);
}

export default FinalScores;
