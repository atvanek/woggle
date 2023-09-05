'use client';

import { useRootSelector, useRootDispatch } from '@/redux/hooks';
import coordinates from '@/utils/coordinates';
import { startWord, selectLetter } from '@/redux/slices/gameSlice';
import { MouseEventHandler } from 'react';
import Block from '@/components/views/Block';
import handleAlert from '@/redux/helpers/handleAlert';

type BlockContainerProps = {
	letter: string;
	id: string;
};

function BlockContainer({ letter, id }: BlockContainerProps) {
	const { selectedBlocks, possibleMoves, wordStarted } = useRootSelector(
		(state) => state.game
	);
	const dispatch = useRootDispatch();

	const validateBlock: MouseEventHandler<HTMLDivElement> = (e) => {
		const currentCoordinates = coordinates[id];
		if (selectedBlocks.includes(String(coordinates))) {
			handleAlert(dispatch, 'selected', 3000);
			return;
		}
		if (wordStarted && !possibleMoves.includes(String(currentCoordinates))) {
			handleAlert(dispatch, 'adjacent', 3000);
			return;
		}
		if (selectedBlocks.length === 0) {
			dispatch(startWord());
		}
		dispatch(selectLetter({ letter, id }));
	};

	return <Block letter={letter} id={id} validateBlock={validateBlock} />;
}

export default BlockContainer;
