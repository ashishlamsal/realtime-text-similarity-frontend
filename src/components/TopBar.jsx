import React, { useEffect, useState, useRef } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import NewIcon from '@mui/icons-material/Add';
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
import { red } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';

import CancelIcon from '@mui/icons-material/Cancel';

function SubjectSelection(props) {
	const { onClose, selectedSubject, open, setLoading, setFailed } = props;
	const algorithms = [
		'Word2Vec',
		'BERT',
		'Arora',
		'Universal Sentence Encoder',
	];
	const handleClose = () => {
		onClose(selectedSubject);
	};

	useEffect(() => {
		handleAlgoSwitch(selectedSubject);
	}, []);

	const handleAlgoSwitch = (value) => {
		setLoading(true);
		onClose(value);

		fetch(`http://127.0.0.1:5000/?algo=${value}`)
			.then((response) => {
				setLoading(false);
				setFailed(false);
				response.json();
			})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log('error', err);
				setFailed(true);
				setLoading(false);
			});
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Select Algorithm</DialogTitle>
			<List sx={{ pt: 0 }}>
				{algorithms.map((index) => (
					<ListItem button onClick={() => handleAlgoSwitch(index)} key={index}>
						<ListItemText primary={index} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}

function TopBar({ questions, setQuestions }) {
	const [open, setOpen] = useState(false);
	const [selectedSubject, setSelectedSubject] = useState('Word2Vec');
	const [loading, setLoading] = useState(true);
	const [failed, setFailed] = useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedSubject(value);
	};

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
				<IconButton onClick={newQuestionSet} color="inherit">
					<NewIcon />
				</IconButton>
				<IconButton onClick={saveQuestions} color="inherit">
					<SaveIcon />
				</IconButton>
			</Grid>
			<Grid item>
				<IconButton onClick={handleClickOpen} color="inherit">
					<LibraryBooksIcon />
				</IconButton>
				<SubjectSelection
					onClose={handleClose}
					open={open}
					selectedSubject={selectedSubject}
					setLoading={setLoading}
					setFailed={setFailed}
				/>
			</Grid>
			<Grid item sx={{ display: 'flex', alignItems: 'baseline' }}>
				<Typography variant="h6" sx={{ marginRight: '5px' }}>
					{selectedSubject}
				</Typography>
				{loading && <CircularProgress size={20} sx={{ color: green[500] }} />}
				{!loading && failed && <CancelIcon sx={{ color: red[500] }} />}
				{!loading && !failed && (
					<CheckIcon
						sx={{
							bgcolor: green[500],
							color: 'white',
							borderRadius: '50%',
							width: '1rem',
							height: '1rem',
							paddingTop: '1px',
						}}
					/>
				)}
			</Grid>
		</Grid>
	);
}

export default TopBar;
