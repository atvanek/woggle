import { Alert } from "@/types/gameSliceTypes";

function generateAlert(type: string, newTimerId: NodeJS.Timeout, currentWord: string): Alert {
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
      newAlert.message =
        'Word has already been played. Please choose new word';
      break;
    case 'invalid':
      newAlert.type = 'error';
      newAlert.message = `${currentWord.toLowerCase()} is not a word`;
      break;
    case 'selected':
      newAlert.type = 'error';
      newAlert.message = 'Box already selected';
      break;
    case 'adjacent':
      newAlert.type = 'error';
      newAlert.message = 'Please select adjacent box';
      break;
  }
  return newAlert
}

export default generateAlert