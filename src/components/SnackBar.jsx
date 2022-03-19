import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SimpleSnackbar({ open, setOpen, message, intent }) {
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	// const action = (
	// 	<React.Fragment>
	// 		<CancelIcon
	// 			color={intent === 'success' ? green[500] : red[500]}
	// 			fontSize="small"
	// 		/>
	// 	</React.Fragment>
	// );

	return (
		<div>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity={intent} sx={{ width: '100%' }}>
					{message}
				</Alert>
			</Snackbar>
		</div>
	);
}
