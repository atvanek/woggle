'use client';

import { useRootSelector } from '@/redux/hooks';

function Score() {
	const score = useRootSelector((state) => state.game.score);
	return <div>Score: {score}</div>;
}

export default Score;
