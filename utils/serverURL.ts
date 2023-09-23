const SERVER_URL =
	process.env.NEXT_PUBLIC_NODE_ENV === 'development'
		? (process.env.NEXT_PUBLIC_DEV_WS_SERVER as string)
		: (process.env.NEXT_PUBLIC_PROD_WS_SERVER as string);

export default SERVER_URL;
