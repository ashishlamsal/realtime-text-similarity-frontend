import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

import { red, green } from '@mui/material/colors';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SimpleSnackbar({ open, setOpen, message, intent }) {
	// const [open, setOpen] = React.useState(false);

	// const handleClick = () => {
	// 	setOpen(true);
	// };

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const action = (
		<React.Fragment>
			{/* <Button color="secondary" size="small" onClick={handleClose}>
				UNDO
			</Button> */}
			{/* <IconButton
				size="small"
				aria-label="close"
				color={intent == 'success' ? green[500] : red[500]}
				onClick={handleClose}
			>
				<CancelIcon fontSize="small" />
			</IconButton> */}
			<CancelIcon
				color={intent == 'success' ? green[500] : red[500]}
				fontSize="small"
			/>
		</React.Fragment>
	);

	return (
		<div>
			{/* <Button onClick={handleClick}>Open simple snackbar</Button> */}
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={intent} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
}
