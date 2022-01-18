import React, { useEffect, useState, useRef } from 'react';
import './styles.scss';
import PredictionList from './predictionList';
import TextareaAutosize from 'react-textarea-autosize';

import {
	ListItemIcon,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box, flexbox } from '@mui/system';

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
			if (e.shiftKey) {
				addAt(index + 1, '');
				setNewBlockPos(index + 1);
			} else if (e.ctrlKey) {
				addAt(index, '');
				setNewBlockPos(index);
			}
		}
	};

	return (
		<React.Fragment>
			<Box sx={{ display: 'flex' }}>
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
				<ListItemIcon className="drag-handle">
					<DragHandleIcon />
				</ListItemIcon>
			</Box>
			{inputFocused && <PredictionList question={text} />}
		</React.Fragment>
	);
};
export default Editor;
