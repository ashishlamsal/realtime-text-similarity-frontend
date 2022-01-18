import React, { useEffect, useState, useRef } from 'react';
import './styles.scss';
import PredictionList from './predictionList';
import TextareaAutosize from 'react-textarea-autosize';

import { Grid, ListItemIcon } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import Accordion from './predictionList';
// import { Box, flexbox } from '@mui/system';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

function SimpleDialog(props) {
	const { onClose, selectedValue, deleteAt, open } = props;

	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (value) => {
		if (value === 1) {
			deleteAt(selectedValue);
		}
		onClose(value);
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Are you sure you want to delete this question?</DialogTitle>
			<List sx={{ pt: 0 }}>
				<ListItem button onClick={() => handleListItemClick(1)} key={1}>
					Yes
				</ListItem>
				<ListItem button onClick={() => handleListItemClick(0)} key={0}>
					No
				</ListItem>
			</List>
		</Dialog>
	);
}

const Editor = ({
	text,
	changeAt,
	index,
	addAt,
	setNewBlockPos,
	newBlockPos,
	deleteAt,
}) => {
	const [inputFocused, setInputFocused] = useState(false);

	const [open, setOpen] = React.useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		// setSelectedValue(value);
	};

	const ref = useRef();

	useEffect(() => {
		if (newBlockPos == index) {
			ref.current.focus();
		}
		setNewBlockPos(-1);
	}, [newBlockPos]);

	const handleKeyDown = (e) => {
		if (e.code === 'Enter') {
			e.preventDefault();
			if (e.ctrlKey) {
				addAt(index, '');
				setNewBlockPos(index);
				return;
			}
			addAt(index + 1, '');
			setNewBlockPos(index + 1);
		}
	};
	return (
		<div style={{ width: '100%' }}>
			<Accordion inputFocused={inputFocused} question={text}>
				<Grid container alignItems={'center'} justifyContent={'center'}>
					<Grid item xs={10}>
						<TextareaAutosize
							type="text"
							onKeyDown={handleKeyDown}
							onFocus={() => setInputFocused(true)}
							onBlur={() => setInputFocused(false)}
							onChange={(event) => {
								changeAt(index, event.target.value);
							}}
							value={text}
							id={text}
							ref={ref}
						/>
					</Grid>
					<Grid item xs={1}>
						<ListItemIcon className="drag-handle">
							<DragHandleIcon />
						</ListItemIcon>
					</Grid>
					<Grid item xs={1}>
						<ListItemIcon className="drag-handle">
							{/* <DeleteRounded onClick={() => deleteAt(index)} /> */}
							<DeleteRounded onClick={handleClickOpen} />
						</ListItemIcon>
					</Grid>
					<SimpleDialog
						selectedValue={index}
						deleteAt={deleteAt}
						open={open}
						onClose={handleClose}
					/>
				</Grid>
			</Accordion>
		</div>
	);
};
export default Editor;
