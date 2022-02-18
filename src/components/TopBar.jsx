import React, { useEffect, useState, useRef } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Grid from '@mui/material/Grid';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { red, grey } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';

import CancelIcon from '@mui/icons-material/Cancel';

import Stack from '@mui/material/Stack';

import Notification from './snackbar';

function SubjectSelection({
	setSelectedAlgo,
	selectedAlgo,
	dialogOpen,
	setDialogOpen,
	setLoading,
	setFailed,
	handleToaster,
}) {
	const algorithms = {
		TFIDF_word2vec: 'WORD_2_VEC',
		BERT: 'BERT',
		'Smooth inverse frequency': 'ARORA',
		'Universal Sentence Encoder': 'USE',
	};

	useEffect(() => {
		handleAlgoSwitch(selectedAlgo);
	}, []);

	const handleAlgoSwitch = (new_algo) => {
		setLoading(true);
		let prev_algo = selectedAlgo;
		// onClose(value);
		setSelectedAlgo(new_algo);

		fetch(`http://127.0.0.1:5000/?algo=${algorithms[new_algo]}`)
			.then((response) => {
				setLoading(false);
				setFailed(false);
				setDialogOpen(false);
				response.json();
				handleToaster('success', 'Successfully switched algorithm');
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log('error', err);
				setFailed(true);
				setLoading(false);
				setSelectedAlgo(prev_algo);
				setDialogOpen(false);
				handleToaster('error', 'Failed to switch algorithm');
			});
	};

	return (
		<Dialog onClose={() => setDialogOpen(false)} open={dialogOpen}>
			<DialogTitle>Select Algorithm</DialogTitle>
			<List sx={{ pt: 0 }}>
				{Object.keys(algorithms).map((index) => (
					<ListItem button onClick={() => handleAlgoSwitch(index)} key={index}>
						<ListItemText primary={index} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}

function NewDialog({ onClose, newQuestionSet, open }) {
	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle
				style={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				<InsertDriveFileIcon />
				<Typography variant="h6" sx={{ marginLeft: '5px' }}>
					Start a new question set?
				</Typography>
			</DialogTitle>

			<Typography p={2}>
				The current question set will be downloaded.
			</Typography>
			<Stack direction="row">
				<ListItemText
					button
					onClick={() => {
						newQuestionSet();
						onClose();
					}}
					key={1}
					style={{
						background: green[300],
						margin: '15px 10px 15px 15px',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					<Typography fontWeight="fontWeightBold" margin="1rem" align="center">
						Confirm
					</Typography>
				</ListItemText>
				<ListItemText
					button
					onClick={() => {
						onClose();
					}}
					key={0}
					style={{
						background: grey[500],
						margin: '15px 15px 15px 10px',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					<Typography fontWeight="fontWeightBold" align="center" margin="1rem">
						Cancel
					</Typography>
				</ListItemText>
			</Stack>
		</Dialog>
	);
}

function SaveDialog({ onClose, newQuestionSet, open }) {
	return (
		<Dialog onClose={onClose} open={open}>
			<DialogTitle
				style={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
					justifyContent: 'center',
				}}
			>
				<SaveIcon />
				<Typography variant="h6" sx={{ marginLeft: '5px' }}>
					Save this question set?
				</Typography>
			</DialogTitle>

			<Typography p={2}>
				The current question set will be downloaded.
			</Typography>
			<Stack direction="row">
				<ListItemText
					button
					onClick={() => {
						newQuestionSet();
						onClose();
					}}
					key={1}
					style={{
						background: green[300],
						margin: '15px 10px 15px 15px',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					<Typography fontWeight="fontWeightBold" margin="1rem" align="center">
						Confirm
					</Typography>
				</ListItemText>
				<ListItemText
					button
					onClick={() => {
						onClose();
					}}
					key={0}
					style={{
						background: grey[500],
						margin: '15px 15px 15px 10px',
						borderRadius: '4px',
						cursor: 'pointer',
					}}
				>
					<Typography fontWeight="fontWeightBold" align="center" margin="1rem">
						Cancel
					</Typography>
				</ListItemText>
			</Stack>
		</Dialog>
	);
}

function TopBar({ questions, setQuestions }) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [selectedAlgo, setSelectedAlgo] = useState(
		'Universal Sentence Encoder'
	);
	const [toasterOpen, setToasterOpen] = useState(false);
	const [toasterIntent, setToasterIntent] = useState('success');
	const [toasterMessage, setToasterMessage] = useState('');

	const handleToaster = (intent, message) => {
		setToasterIntent(intent);
		setToasterMessage(message);
		setToasterOpen(true);
	};

	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	const saveQuestions = () => {
		var a = document.createElement('a');
		var file = new Blob([JSON.stringify(questions)], { type: 'text/plain' });
		a.href = URL.createObjectURL(file);
		a.download = 'questions.json';
		a.click();
	};

	const newQuestionSet = () => {
		saveQuestions();
		setQuestions(['']);
	};

	const [openNewDialog, setOpenNewDialog] = useState(false);
	const [openSaveDialog, setOpenSaveDialog] = useState(false);

	return (
		<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="center"
			sx={{
				pt: 2,
				pl: 2,
			}}
		>
			<Grid item>
				<IconButton
					onClick={() => {
						setOpenNewDialog(true);
					}}
					color="inherit"
				>
					<InsertDriveFileIcon />
				</IconButton>
				<NewDialog
					newQuestionSet={newQuestionSet}
					open={openNewDialog}
					onClose={() => setOpenNewDialog(false)}
				/>
				<IconButton
					onClick={() => {
						setOpenSaveDialog(true);
					}}
					color="inherit"
				>
					<SaveIcon />
				</IconButton>
				<SaveDialog
					newQuestionSet={saveQuestions}
					open={openSaveDialog}
					onClose={() => setOpenSaveDialog(false)}
				/>
			</Grid>
			<Grid item>
				<IconButton onClick={() => setDialogOpen(true)} color="inherit">
					<LibraryBooksIcon />
				</IconButton>
				<SubjectSelection
					dialogOpen={dialogOpen}
					setDialogOpen={setDialogOpen}
					selectedAlgo={selectedAlgo}
					setSelectedAlgo={setSelectedAlgo}
					setLoading={setLoading}
					setFailed={setFailed}
					handleToaster={handleToaster}
				/>
			</Grid>
			<Grid item sx={{ display: 'flex', alignItems: 'center' }}>
				<Typography variant="h6" sx={{ marginRight: '5px' }}>
					{selectedAlgo}
				</Typography>
				{loading && (
					<CircularProgress
						size={20}
						sx={{
							color: green[500],
							width: '1.1rem',
							height: '1.1rem',
							paddingTop: '1px',
						}}
					/>
				)}
				{!loading && failed && (
					<CancelIcon
						sx={{
							color: red[500],
							width: '1.2rem',
							height: '1.2rem',
							marginBottom: '3px',
						}}
					/>
				)}
				{!loading && !failed && (
					<CheckIcon
						sx={{
							bgcolor: green[500],
							color: 'white',
							borderRadius: '50%',
							width: '1.1rem',
							height: '1.1rem',
							paddingTop: '1.5px',
						}}
					/>
				)}
				<Notification
					intent={toasterIntent}
					message={toasterMessage}
					open={toasterOpen}
					setOpen={setToasterOpen}
				/>
			</Grid>
		</Grid>
	);
}

export default TopBar;
