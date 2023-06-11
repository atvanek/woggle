import { Switch } from '@mui/material';

function Timed({ timed, handleToggle }) {
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
