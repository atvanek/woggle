import { triggerAlert, resetAlert } from '../slices/gameSlice';
import alertDisplayTime from '@/utils/alertDisplayTime';

const handleAlert = (dispatch: any, type: string) => {
	const timer = setTimeout(() => {
		dispatch(resetAlert());
	}, alertDisplayTime);
	dispatch(triggerAlert({ type, newTimerId: timer }));
};

export default handleAlert;
