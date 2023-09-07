import { AlertColor } from '@mui/material';

export type Alert = {
	active: boolean;
	message: string;
	type: AlertColor;
	timerId: NodeJS.Timeout | null;
};

export type GameState = {
	currentWord: string;
	selectedBlocks: string[];
	possibleMoves: string[];
	wordStarted: boolean;
	score: number;
	alert: Alert;
	playedWords: string[];
	timed: boolean;
};

export type AlertType = 'length' | 'played' | 'invalid' | 'selected' | 'adjacent' | 'validated'
