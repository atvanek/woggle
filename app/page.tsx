import Buttons from '@/components/containers/Buttons';
import Score from '@/components/views/Score';
import Alert from '@/components/views/Alert';
import TimeToggle from '@/components/views/TimeToggle';
import Board from '@/components/containers/Board';
import PlayedWords from '@/components/containers/PlayedWords';

export default function Home() {
	return (
		<>
			<h2 className='text-4xl text-center my-5'>Woggle</h2>
			<main className='flex w-full my-20'>
				<section id='played-words' className='w-4/12'>
					<PlayedWords />
				</section>
				<section id='board' className='flex flex-col items-center w-4/12'>
					<Board />
					<Buttons />
					<Score />
					<Alert />
				</section>
				<section className='flex flex-col w-4/12 items-center'>
					<TimeToggle />
				</section>
			</main>
		</>
	);
}
