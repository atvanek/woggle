import Buttons from '@/components/containers/Buttons';
import Score from '@/components/views/Score';
import Alert from '@/components/views/Alert';
import TimeToggle from '@/components/views/TimeToggle';
import Board from '@/components/containers/Board';
import PlayedWords from '@/components/containers/PlayedWords';
import { ThemeProvider } from '@mui/material';
import theme from '@/theme';

export default function Home() {
	return (
		<main className='flex w-full justify-center'>
			<section id='board' className='flex flex-col items-center'>
				<ThemeProvider theme={theme}>
					<TimeToggle />
					<Board />
					<Buttons />
					<Score />
					<Alert />
				</ThemeProvider>
			</section>
			<section id='played-words'>
				<PlayedWords />
			</section>
		</main>
	);
}
