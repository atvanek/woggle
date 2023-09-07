import { Alert } from '@/types/gameSliceTypes';

function createAlert(
	type: string,
	word: string,
	newTimerId: NodeJS.Timeout
): Alert {
	const newAlert: Alert = {
		message: '',
		type: 'error',
		active: true,
		timerId: newTimerId,
	};
	switch (type) {
		case 'length':
			newAlert.type = 'error';
			newAlert.message = 'Word must be at least 3 letters';
			break;
		case 'played':
			newAlert.type = 'error';
			newAlert.message = 'Word has already been played. Please choose new word';
			break;
		case 'invalid':
			newAlert.type = 'error';
			newAlert.message = `${word.toLowerCase()} is not a word`;
			break;
		case 'selected':
			newAlert.type = 'error';
			newAlert.message = 'Box already selected';
			break;
		case 'adjacent':
			newAlert.type = 'error';
			newAlert.message = 'Please select adjacent box';
			break;
		case 'validated':
			newAlert.type = 'success';
			newAlert.message = `${word.toLowerCase()} successfully played!`;
			break;
	}
	return newAlert;
}

export default createAlert;
