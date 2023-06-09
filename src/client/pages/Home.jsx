import React from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import generateLetters from '../../utils/generateLetters';
import Timer from '../components/Timer.jsx';
import TimeLimit from '../components/TimeLimit';
import { Switch } from '@mui/material';
import Context from '../context';
import Controls from '../components/Controls';
import Played from '../components/Played';

function Home({ serverLetters, room, socketId }) {
	const [letters, setLetters] = React.useState([]);
	const [playerScores, setPlayerScores] = React.useState([]);
	const [timeLimit, setTimeLimit] = React.useState(1);
	const navigate = useNavigate();

	const {
		timed,
		setTimed,
		timerStarted,
		setTimerStarted,
		score,
		setScore,
		playedWords,
	} = React.useContext(Context);
	//connect to websocket
	const socket = io('http://localhost:3000/');

	//logic for initial render of board and letters
	React.useEffect(() => {
		setLetters(generateLetters());
	}, []);

	//ALL EMITTED EVENTS

	//any player adds to current score
	socket.on('new-scores', (newScores) => {
		//sets player scores
		setPlayerScores(JSON.parse(newScores));
	});

	//end game logic
	socket.on('end-game', (scores) => {
		//generates string for end-game pop-up
		//determines winner
		let highScore = 0;
		let winner = '';
		const parsedScores = JSON.parse(scores);
		const finalScores = parsedScores.map((obj) => {
			if (obj.user.score > highScore) {
				highScore = obj.user.score;
				winner = obj.user.username;
			}
			return `${obj.user.username}: ${obj.user.score}\n`;
		});
		//pop-up
		window.alert(
			`Game ended!\nFinal Scores:\n${finalScores.join(
				''
			)}\n${winner} is the winner!`
		);
		socket.disconnect();
		//re-route to homescreen
		navigate('/');
	});

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
