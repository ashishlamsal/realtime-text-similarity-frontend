import React, { useEffect, useState, useRef } from 'react';
import './styles.scss';
import PredictionList from './predictionList';
import TextareaAutosize from 'react-textarea-autosize';

import { Grid, ListItemIcon } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import DeleteRounded from '@mui/icons-material/DeleteRounded';
import Accordion from './predictionList';
// import { Box, flexbox } from '@mui/system';

import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Typography from '@mui/material/Typography';

import { red } from '@mui/material/colors';
import Stack from '@mui/material/Stack';

function DeleteDialog(props) {
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
			<DialogTitle
				style={{
					display: 'flex',
					alignItems: 'center',
					flexWrap: 'wrap',
				}}
			>
				<DeleteIcon />
				Are you sure?
			</DialogTitle>

			<Typography p={2}>
				This process is irreversible and the data will be lost.
			</Typography>
			<Stack direction="row">
				<ListItemText
					button
					onClick={() => handleListItemClick(1)}
					key={1}
					style={{ background: red[500], margin: 'auto', cursor: 'pointer' }}
				>
					<Typography fontWeight="fontWeightBold" margin="1rem" align="center">
						Confirm
					</Typography>
				</ListItemText>
				<ListItemText
					button
					onClick={() => handleListItemClick(0)}
					key={0}
					style={{ margin: 'auto', cursor: 'pointer' }}
				>
					<Typography fontWeight="fontWeightBold" align="center" margin="1rem">
						Cancel
					</Typography>
				</ListItemText>
			</Stack>
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
				<Grid
					container

					sx={{
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
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
							<DragHandleIcon onClick={() => setOpen(false)}/>
						</ListItemIcon>
					</Grid>
					<Grid item xs={1}>
						<ListItemIcon >
							{/* <DeleteRounded onClick={() => deleteAt(index)} /> */}
							<DeleteRounded onClick={handleClickOpen} />
						</ListItemIcon>
					</Grid>
					<DeleteDialog
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
