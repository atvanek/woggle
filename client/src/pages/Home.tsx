import { useEffect, useContext, useState } from 'react';
import Board from '../components/Board';
import generateLetters from '../../../utils/generateLetters.js';
import Timer from '../components/Timer.jsx';
import Timed from '../components/Timed';
import TimeLimit from '../components/TimeLimit';
import Context from '../context/context';
import Controls from '../components/Controls';
import Played from '../components/Played';

function Home() {
	const [letters, setLetters] = useState<Array<string[]>>([]);
	const [timeLimit, setTimeLimit] = useState(1);

	const { timed, timerStarted, setTimerStarted, score, setScore } =
		useContext(Context)!;

	//logic for initial render of board and letters
	useEffect(() => {
		setLetters(generateLetters());
	}, []);

	function handleGameStart() {
		setTimerStarted(true);
		setScore(0);
		setLetters(generateLetters);
	}

	const props = {
		timeLimit,
		setTimeLimit,
		timed,
		timerStarted,
		setTimerStarted,
		setScore,
		setLetters,
		show: timed && !timerStarted,
		handleGameStart,
	};

	return (
		<>
			<main className='flex around m-10'>
				<section id='board' className='flex column center'>
					<Timed />
					<Board letters={letters} />
					<div id='score'>Score: {score}</div>
					<TimeLimit {...props} />
					<Controls />
					<div className='flex center-all'>
						{timed && timerStarted && <Timer time={timeLimit * 60} />}
					</div>
				</section>
				<Played />
			</main>
		</>
	);
}
export default Home;
