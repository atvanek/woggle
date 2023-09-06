'use client';

import { Switch } from '@mui/material';
import { useRootDispatch } from '@/redux/hooks';
import { toggleTimed } from '@/redux/slices/gameSlice';

function TimeToggle() {
	const dispatch = useRootDispatch();
	return <Switch onClick={() => dispatch(toggleTimed)} />;
}

export default TimeToggle;
