import React, { useEffect, useState, useRef } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import NewIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import CheckIcon from '@mui/icons-material/Check';

function SubjectSelection(props) {
	const { onClose, selectedSubject, open, setLoading } = props;
	const algorithms = [
		'word2vec',
		'BERT',
		'Arora',
		'Universal Sentence Encoder',
	];
	const handleClose = () => {
		onClose(selectedSubject);
	};

	const handleListItemClick = (value) => {
		// request to the server here
		setLoading(true);
		onClose(value);

		fetch('http://127.0.0.1:5000')
			.then((response) => {
				setLoading(false);
				response.json();
			})
			.then((data) => {
				console.log(data);
			});
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Select Algorithm</DialogTitle>
			<List sx={{ pt: 0 }}>
				{algorithms.map((index) => (
					<ListItem
						button
						onClick={() => handleListItemClick(index)}
						key={index}
					>
						<ListItemText primary={index} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}

function TopBar({ questions, setQuestions }) {
	const [open, setOpen] = useState(false);
	const [selectedSubject, setSelectedSubject] = useState('word2vec');

	const [loading, setLoading] = useState(false);

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
		<Grid container spacing={2} sx={{margin: "5px"}}>
			<Grid item style={{ textAlign: 'center',  }}>
				<NewIcon onClick={newQuestionSet} />
			</Grid>
			<Grid item style={{ textAlign: 'center' }}>
				<SaveIcon onClick={saveQuestions} />
			</Grid>

			<Grid item style={{ textAlign: 'center' }}>
				<LibraryBooksIcon onClick={handleClickOpen} />
				<SubjectSelection
					selectedSubject={selectedSubject}
					open={open}
					onClose={handleClose}
					setLoading={setLoading}
				/>
			</Grid>

			<Grid item style={{ textAlign: 'center', display: 'flex' }}>
				<Typography sx={{ marginRight: '5px' }}>{selectedSubject}</Typography>
				{loading && (
					<CircularProgress
					size={20}
					/>
				)}
				{!loading && (
					<CheckIcon
						sx={{
							bgcolor: green[500],
							color: 'white',
							borderRadius: '50%',
							width: '1rem',
							height: '1rem',
							marginTop: '4px'
						}}
					/>
				)}
			</Grid>
		</Grid>
	);
}

export default TopBar;
