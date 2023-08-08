import { Socket } from 'socket.io-client';
import { ChangeEvent, ReactNode } from 'react';
import { AlertColor } from '@mui/material';

export type ContextProps = {
	children: ReactNode;
};

export type Alert = {
	type: AlertColor;
	message: string;
};

export type ContextValues = {
	loggedIn: boolean;
	setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
	user: string;
	setUser: React.Dispatch<React.SetStateAction<string>>;
	selectedBoxes: Set<string>;
	setSelectedBoxes: React.Dispatch<React.SetStateAction<Set<string>>>;
	wordStarted: boolean;
	setWordStarted: React.Dispatch<React.SetStateAction<boolean>>;
	possibleMoves: Set<string>;
	setPossibleMoves: React.Dispatch<React.SetStateAction<Set<string>>>;
	currentWord: string;
	setCurrentWord: React.Dispatch<React.SetStateAction<string>>;
	alert: {
		type: AlertColor;
		message: string;
	};
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	handleAlert: (type: string) => void;
	handleBoxClick: (id: string, letter: string) => void;
	timed: boolean;
	setTimed: React.Dispatch<React.SetStateAction<boolean>>;
	timerStarted: boolean;
	setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
	validateWord: React.MouseEventHandler<HTMLButtonElement>;
	playedWords: Set<string>;
	setPlayedWords: React.Dispatch<React.SetStateAction<Set<string>>>;
	clearBoard: () => void;
	multiplayer: boolean;
	setMultiplayer: React.Dispatch<React.SetStateAction<boolean>>;
	room: { id: string; emoji: string };
	setRoom: React.Dispatch<React.SetStateAction<Room>>;
	socket: Socket;
	setSocket: React.Dispatch<React.SetStateAction<Socket>>;
	socketId: string;
	setSocketId: React.Dispatch<React.SetStateAction<any>>;
	score: number;
	setScore: React.Dispatch<React.SetStateAction<number>>;
	wordPoints: number;
	setWordPoints: React.Dispatch<React.SetStateAction<number>>;
	handleToggle: (e: ChangeEvent<HTMLInputElement>) => void;
	starting: boolean;
	setStarting: React.Dispatch<React.SetStateAction<boolean>>;
};

export type Room = {
	id: string;
	emoji: string;
};

export type BoardProps = {
	letters: Array<string[]>;
};

export type BoxProps = {
	letter: string;
	id: string;
};

export type FinalScoresProps = {
	message: JSX.Element | null;
};

export type HostProps = {
	started: boolean;
	timeLimit: Number;
	setTimeLimit: React.Dispatch<React.SetStateAction<number>>;
};

export type ErrorObj = {
	type: string;
	message: string;
};

export type UsernameInputProps = {
	error: ErrorObj;
	setError: React.Dispatch<React.SetStateAction<ErrorObj>>;
};

export type RowProps = {
	row: number;
	letters: string[];
	id: string;
};

export type Coordinates = {
	[key: string]: [number, number];
};

export type TimeLimitProps = {
	timeLimit: Number;
	setTimeLimit: React.Dispatch<React.SetStateAction<number>>;
	handleGameStart: () => void;
	show: boolean;
};
