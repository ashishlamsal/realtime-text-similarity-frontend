import React from 'react';
import Layout from './components/Layout';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { amber, grey, blueGrey } from '@mui/material/colors';

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === 'light'
			? {
					// palette values for light mode
					primary: amber,
					divider: amber[200],
					background: {
						default: grey[300],
						paper: grey[100],
					},
					text: {
						primary: grey[900],
						secondary: grey[800],
					},
			  }
			: {
					// palette values for dark mode
					primary: blueGrey,
					divider: blueGrey[700],
					background: {
						default: blueGrey[900],
						paper: blueGrey[900],
					},
					text: {
						primary: '#fff',
						secondary: grey[500],
					},
			  }),
	},
});

function App() {
	const [mode, setMode] = React.useState('light');
	const colorMode = React.useMemo(
		() => ({
			// The dark mode switch would invoke this method
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	// Update the theme only if the mode changes
	const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
	
	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
			
				<Layout context={ColorModeContext} />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}

export default App;
