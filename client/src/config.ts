const isProduction = process.env.NODE_ENV === 'production';

const config = {
	DEV_PORT: 8080,
	WS_BASE_URL: isProduction
		? 'https://woggle-0283af63f9a9.herokuapp.com'
		: 'http://localhost:3000',
	API_BASE_URL: isProduction
		? 'https://woggle-0283af63f9a9.herokuapp.com'
		: 'http://localhost:8080/api',
};

export default config;
