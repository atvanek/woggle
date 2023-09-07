'use client';

import { createTheme } from '@mui/material/styles';

const tealPalette = {
	light: '#33ab9f',
	main: '#009688',
	dark: '#00695f',
	contrastText: '#fff',
};

const orangePalette = {
	light: '#ffa733',
	main: '#ff9100',
	dark: '#b26500',
	contrastText: '#fff',
};

const theme = createTheme({
	palette: {
		primary: tealPalette,
		secondary: orangePalette,
		success: tealPalette,
		error: orangePalette,
	},
});

export default theme;
