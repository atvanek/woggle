import { triggerAlert, resetAlert } from '../slices/gameSlice';

const handleAlert = (dispatch: any, type: string, duration: number) => {
	const timer = setTimeout(() => {
		dispatch(resetAlert());
	}, duration);
	dispatch(triggerAlert({ type, newTimerId: timer }));
};

export default handleAlert;
