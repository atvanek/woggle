import { Letters } from '@/types/gameSliceTypes';
import RoomPicker from '@/components/containers/RoomPicker';
import PlayedWords from '@/components/containers/PlayedWords';
import Board from '@/components/containers/Board';
import TimeToggle from '@/components/views/TimeToggle';
import SERVER_URL from '@/utils/serverURL';

async function getLetters() {
	const res: Response = await fetch(`${SERVER_URL}/letters`);
	const letters: Promise<Letters> = await res.json();
	return letters;
}

async function getEmojiData() {
	const res = await fetch('https://cdn.jsdelivr.net/npm/@emoji-mart/data');
	const data = await res.json();
	return data;
}

export default async function Home() {
	const letters = await getLetters();
	const emojiData = await getEmojiData();
	return (
		<>
			<h2 className='text-4xl text-center my-5'>Woggle</h2>
			<RoomPicker emojiData={emojiData} />
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
