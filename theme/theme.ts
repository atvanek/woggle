'use client';

import { createTheme, ThemeOptions } from '@mui/material/styles';

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

const options: ThemeOptions = {
	palette: {
		primary: tealPalette,
		secondary: orangePalette,
		success: tealPalette,
		error: orangePalette,
	},
};

const theme = createTheme(options);

export default theme;
