'use client';

import { resetWord } from '@/redux/slices/gameSlice';
import { useDispatch } from 'react-redux';

function ResetButton() {
	const dispatch = useDispatch();
	function handleReset() {
		const selectedBlocks = document.querySelectorAll('.selected');
		selectedBlocks.forEach((block) => block.classList.remove('selected'));
		dispatch(resetWord());
	}
	return <button onClick={handleReset}>Reset Word</button>;
}

export default ResetButton;
