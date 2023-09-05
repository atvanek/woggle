'use client';

import { MouseEventHandler } from 'react';

type PlayWordButtonProps = {
	handlePlayWord: MouseEventHandler<HTMLButtonElement>;
};

function PlayWordButton({ handlePlayWord }: PlayWordButtonProps) {
	return <button onClick={handlePlayWord}>Play Word</button>;
}

export default PlayWordButton;
