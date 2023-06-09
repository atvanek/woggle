import { useNavigate } from 'react-router-dom';
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
} from '@mui/material';

function FinalScores({ open, message }) {
	const navigate = useNavigate();
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
