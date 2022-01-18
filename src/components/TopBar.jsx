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


function SubjectSelection(props) {
	const { onClose, selectedSubject, open } = props;

	const handleClose = () => {
		onClose(selectedSubject);
	};

	const handleListItemClick = (value) => {
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Select Subject</DialogTitle>
			<List sx={{ pt: 0 }}>
				<ListItem
					button
					onClick={() => handleListItemClick('Applied Maths')}
					key={'Applied Maths'}
				>
					<ListItemText primary={'Applied Maths'} />
				</ListItem>

                <ListItem
					button
					onClick={() => handleListItemClick('Electronics')}
					key={'Electronics'}
				>
					<ListItemText primary={'Electronics'} />
				</ListItem>


				<ListItem
					autoFocus
					button
					onClick={() => handleListItemClick('addAccount')}
				>
					<ListItemText primary="Create new subject" />
				</ListItem>
			</List>
		</Dialog>
	);
}

function TopBar({ questions, setQuestions }) {
	const [open, setOpen] = useState(false);
	const [selectedSubject, setSelectedSubject] = useState("Applied Maths");
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
		<Grid container spacing={2}>
			<Grid item style={{ textAlign: 'center' }}>
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
				/>
			</Grid>
            <Grid item style={{ textAlign: 'center' }}>
                <Typography>{selectedSubject}</Typography>
			</Grid>
		</Grid>
	);
}

export default TopBar;
