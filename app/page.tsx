import { Letters } from '@/types/gameSliceTypes';
import RoomPicker from '@/components/containers/RoomPicker';
import PlayedWords from '@/components/containers/PlayedWords';
import Board from '@/components/containers/Board';
import TimeToggle from '@/components/views/TimeToggle';

async function getLetters() {
	const SERVER_URL =
	process.env.NEXT_PUBLIC_NODE_ENV === 'development'
		? (process.env.NEXT_PUBLIC_DEV_WS_SERVER as string)
		: (process.env.NEXT_PUBLIC_PROD_WS_SERVER as string);
	const res: Response = await fetch(`${SERVER_URL}/letters`);
	const letters: Promise<Letters> = await res.json();
	return letters;
}

export default async function Home() {
	const letters = await getLetters();
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
					<Board letters={letters} />
				</section>
				<section className='flex flex-col w-4/12 items-center min-w-min max-md:w-full'>
					<TimeToggle />
				</section>
			</main>
		</>
	);
}
