import React, { useEffect, useState, useRef } from 'react';
import './styles.scss';
import PredictionList from './predictionList';
import TextareaAutosize from 'react-textarea-autosize';

import { Grid, ListItemIcon } from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
// import { Box, flexbox } from '@mui/system';

const Editor = ({
	text,
	changeAt,
	index,
	addAt,
	setNewBlockPos,
	newBlockPos,
}) => {
	const [inputFocused, setInputFocused] = useState(false);
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
			<Grid item xs={2}>
				<ListItemIcon className="drag-handle">
					<DragHandleIcon />
				</ListItemIcon>
			</Grid>

			{inputFocused && (
				<Grid item xs={10}>
					<PredictionList question={text} />
				</Grid>
			)}
		</Grid>
	);
};
export default Editor;
