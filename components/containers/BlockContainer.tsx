'use client';

import { useRootSelector, useRootDispatch } from '@/redux/hooks';
import coordinates from '@/utils/coordinates';
import { handleAlert, startWord, selectLetter } from '@/redux/slices/gameSlice';
import { MouseEventHandler, ReactNode } from 'react';
import Block from '@/components/Block';

type BlockContainerProps = {
	letter: string;
	id: string;
};

function BlockContainer({ letter, id }: BlockContainerProps) {
	const { selectedBlocks, possibleMoves, wordStarted } = useRootSelector(
		(state) => state.game
	);
	const dispatch = useRootDispatch();

	const validateBlock: MouseEventHandler<HTMLDivElement> = () => {
		const currentCoordinates = coordinates[id];
		if (selectedBlocks.includes(String(currentCoordinates))) {
			dispatch(handleAlert('selected'));
			return;
		}
		if (wordStarted && !possibleMoves.includes(String(currentCoordinates))) {
			dispatch(handleAlert('adjacent'));
			return;
		}
		if (!selectedBlocks.length) {
			dispatch(startWord());
		}
		dispatch(selectLetter({ letter, id, currentCoordinates }));
	};

	return <Block letter={letter} id={id} validateBlock={validateBlock} />;
}

export default BlockContainer;
