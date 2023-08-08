import { Switch } from '@mui/material';
import { useContext } from 'react';
import Context from '../context/context';

function Timed() {
	const { timed, handleToggle } = useContext(Context)!;
	return (
		<div
			id='timed-wrapper'
			className={`flex center-all m-10 ${timed ? 'timed' : ''}`}>
			untimed
			<Switch color='warning' onChange={handleToggle} />
			timed
		</div>
	);
}

export default Timed;
