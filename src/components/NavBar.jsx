import { useState } from 'react';
import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button, Input } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GitHubIcon from '@mui/icons-material/GitHub';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import UploadIcon from '@mui/icons-material/Upload';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';

export default function NavBar({
	colorMode,
	theme,
	handleUploadClick,
	currentDatabase,
}) {
	const [uploading, setUploading] = useState(false);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ background: 'transparent' }}>
				<Toolbar variant="dense">
					<Tooltip title="Home">
						<IconButton size="medium" color="inherit" aria-label="menu">
							<DashboardIcon />
						</IconButton>
					</Tooltip>

					<Typography
						variant="overline"
						component="h1"
						sx={{ flexGrow: 1, fontWeight: 'bold', lineHeight: 'normal' }}
					>
						Realtime Text Similarity Identification
					</Typography>

					{uploading && (
						<>
							<Typography
								variant="overline"
								component="h3"
								sx={{ lineHeight: 'normal', mr: 2 }}
							>
								Creating Index...
							</Typography>

							<CircularProgress
								size={24}
								sx={{
									color: green[500],
									mr: 2,
								}}
							/>
						</>
					)}
					{!uploading && (
						<>
							<Typography
								variant="overline"
								component="h3"
								sx={{ lineHeight: 'normal', mr: 2 }}
							>
								Using <b>{currentDatabase}</b> Dataset
							</Typography>
						</>
					)}
					<label htmlFor="contained-button-file">
						<Input
							accept=".txt, text/plain"
							id="contained-button-file"
							multiple
							type="file"
							sx={{ display: 'none' }}
							onChange={(e) => {
								handleUploadClick(e, setUploading);
								// setCurrentDatabase()
							}}
						/>
						<Tooltip title="Upload Dataset">
							<Button
								size="small"
								variant="contained"
								component="span"
								sx={{ mr: 1 }}
								startIcon={<UploadIcon />}
							>
								Dataset
							</Button>
						</Tooltip>
					</label>

					<Tooltip title="GitHub">
						<IconButton
							href="https://github.com/ashishlamsal/realtime-text-similarity-frontend"
							target="_blank"
							size="medium"
							color="inherit"
							aria-label="menu"
						>
							<GitHubIcon />
						</IconButton>
					</Tooltip>

					<Tooltip title="Switch Theme">
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
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
