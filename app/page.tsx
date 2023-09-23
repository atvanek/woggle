import Buttons from '@/components/containers/Buttons';
import Score from '@/components/views/Score';
import Alert from '@/components/views/Alert';
import Board from '@/components/containers/BoardWithLetters';
import PlayedWords from '@/components/containers/PlayedWords';
import TimeToggle from '@/components/views/TimeToggle';
import RoomPicker from '@/components/containers/RoomPickerContainer';

export default function Home() {
	return (
		<>
			<h2 className='text-4xl text-center my-5'>Woggle</h2>
			<RoomPicker />
			<main className='flex w-full my-20 max-md:flex-col sm:max-md:flex-wrap'>
				<section id='played-words' className='w-4/12 min-w-min max-md:w-full'>
					<PlayedWords />
				</section>
				<section
					id='board'
					className='flex flex-col items-center w-4/12 min-w-min max-md:w-full'>
					<Board />
					<Buttons />
					<Score />
					<Alert />
				</section>
				<section className='flex flex-col w-4/12 items-center min-w-min max-md:w-full'>
					<TimeToggle />
				</section>
			</main>
		</>
	);
}
