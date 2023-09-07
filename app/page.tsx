import Buttons from '@/components/containers/Buttons';
import Score from '@/components/views/Score';
import Alert from '@/components/views/Alert';
import TimeToggle from '@/components/views/TimeToggle';
import Board from '@/components/containers/Board';

export default function Home() {
	return (
		<main>
			<section id='board' className='flex flex-col w-full items-center'>
				<TimeToggle />
				<Board />
				<Buttons />
				<Score />
				<Alert />
			</section>
		</main>
	);
}
