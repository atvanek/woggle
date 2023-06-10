import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
	const navigate = useNavigate();
	// const location = useLocation();

	const { timed, setTimed, timerStarted, setTimerStarted, score, setScore, connection } =
		React.useContext(Context);
	// //connect to websocket

	//logic for initial render of board and letters
	React.useEffect(() => {
		setLetters(generateLetters());
	}, []);

	//ALL EMITTED EVENTS

	//any player adds to current score

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
