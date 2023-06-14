const isProduction = process.env.NODE_ENV === 'production';

const config = {
	DEV_PORT: 8080,
	WS_BASE_URL: isProduction
		? 'https://woggle.herokuapp.com'
		: 'http://localhost:8080',
	API_BASE_URL: isProduction
		? 'https://woggle.herokuapp.com'
		: 'http://localhost:8080/api',
};

export default config;
