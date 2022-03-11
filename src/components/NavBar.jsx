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
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { Button, Input } from '@mui/material';
import { useState } from 'react';

export default function NavBar({ colorMode, theme, handleUploadClick }) {
	const [uploading, setUploading] = useState(false);

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
									// position: 'absolute',
									// top: '50%',
									// left: '50%',
									// paddingTop: '50px',
									// marginTop: '50px',
									// marginLeft: '-12px',
									mr: 2,
								}}
							/>
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
							}}
						/>

						<Button variant="contained" component="span">
							Upload
						</Button>
					</label>

					{/* <Button variant="contained" onClick={handleUploadClick}>
						Upload Dataset						
					</Button> */}
					{/* <input type="file" onChange={this.uploadFile} /> */}

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
