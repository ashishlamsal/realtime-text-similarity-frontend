import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function NavBar({ colorMode, theme }) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ background: 'transparent' }}>
				<Toolbar variant="dense">
					<IconButton size="medium" color="inherit" aria-label="menu">
						<DashboardIcon />
					</IconButton>
					<Typography
						variant="overline"
						component="h1"
						sx={{ flexGrow: 1, fontWeight: 'bold', lineHeight: 'normal' }}
					>
						Realtime Text Similarity Identification
					</Typography>

					<IconButton
						href="https://github.com/ashishlamsal/realtime-text-similarity-frontend"
						target="_blank"
						size="medium"
						color="inherit"
						aria-label="menu"
					>
						<GitHubIcon />
					</IconButton>

					<IconButton
						sx={{ ml: 1 }}
						onClick={colorMode.toggleColorMode}
						color="inherit"
					>
						{theme.palette.mode === 'dark' ? (
							<Brightness7Icon />
						) : (
							<Brightness4Icon />
						)}
					</IconButton>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
