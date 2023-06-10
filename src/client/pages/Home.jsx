import React, { useEffect } from 'react';
import Board from '../components/Board';
import generateLetters from '../../utils/generateLetters';
import Timer from '../components/Timer.jsx';
import TimeLimit from '../components/TimeLimit';
import { Switch } from '@mui/material';
import Context from '../context';
import Controls from '../components/Controls';
import Played from '../components/Played';

function Home() {
	const [letters, setLetters] = React.useState([]);
	const [timeLimit, setTimeLimit] = React.useState(1);
	const { timed, setTimed, timerStarted, setTimerStarted, score, setScore } =
		React.useContext(Context);

	//logic for initial render of board and letters
	useEffect(() => {
		setLetters(generateLetters());
	}, []);

	return (
		<main className='flex around m-10'>
			<section id='board' className='flex column center'>
				<div
					id='timed-wrapper'
					className={`flex center-all m-10 ${timed ? 'timed' : ''}`}>
					untimed
					<Switch
						color='warning'
						onChange={(e) => {
							if (timed) {
								setScore(0);
								setTimerStarted(false);
							}
							setTimed(e.target.checked);
						}}
					/>
					timed
				</div>
				<Board letters={letters} />
				<div id='score'>Score: {score}</div>
				<TimeLimit
					timeLimit={timeLimit}
					setTimeLimit={setTimeLimit}
					timed={timed}
					timerStarted={timerStarted}
					setTimerStarted={setTimerStarted}
					setScore={setScore}
					setLetters={setLetters}
				/>
				<Controls />
				<div className='flex center-all'>
					{timed && timerStarted && <Timer time={timeLimit * 60} />}
				</div>
			</section>
			<Played />
		</main>
	);
}
export default Home;
