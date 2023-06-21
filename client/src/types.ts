import { Socket } from 'socket.io-client';
import { ChangeEvent, ReactNode } from 'react';

export type ContextProps = {
	children: ReactNode;
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
	alert: { type: string; message: string };
	open: boolean;
	handleAlert: (type: string) => void;
	handleBoxClick: (id: string, letter: string) => void;
	timed: boolean;
	setTimed: React.Dispatch<React.SetStateAction<boolean>>;
	timerStarted: boolean;
	setTimerStarted: React.Dispatch<React.SetStateAction<boolean>>;
	validateWord: (e: MouseEvent) => void;
	playedWords: Set<string>;
	setPlayedWords: React.Dispatch<React.SetStateAction<Set<string>>>;
	clearBoard: () => void;
	multiplayer: boolean;
	setMultiplayer: React.Dispatch<React.SetStateAction<boolean>>;
	room: object;
	setRoom: React.Dispatch<React.SetStateAction<object>>;
	socket: Socket;
	setSocket: React.Dispatch<React.SetStateAction<Socket>>;
	socketId: any;
	setSocketId: React.Dispatch<React.SetStateAction<any>>;
	score: number;
	setScore: React.Dispatch<React.SetStateAction<number>>;
	wordPoints: number;
	setWordPoints: React.Dispatch<React.SetStateAction<number>>;
	handleToggle: (e: ChangeEvent<HTMLInputElement>) => void;
	starting: boolean;
	setStarting: React.Dispatch<React.SetStateAction<boolean>>;
};
