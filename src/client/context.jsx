import React, { createContext } from 'react';

const Context = createContext(null);

export function ContextProvider({ children }) {
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [user, setUser] = React.useState('');

	return (
		<Context.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
			{children}
		</Context.Provider>
	);
}

export default Context;
