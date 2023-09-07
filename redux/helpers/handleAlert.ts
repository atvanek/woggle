import { triggerAlert, resetAlert } from '../slices/gameSlice';
import alertDisplayTime from '@/utils/alertDisplayTime';
import { AlertType } from '@/types/gameSliceTypes';

const handleAlert = (dispatch: any, type: AlertType) => {
	const timer = setTimeout(() => {
		dispatch(resetAlert());
	}, alertDisplayTime);
	dispatch(triggerAlert({ type, newTimerId: timer }));
};

export default handleAlert;
