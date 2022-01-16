import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './styles.scss';
import PredictionList from './predictionList';
import { onBlur } from 'draft-js/lib/DraftEditorEditHandler';

import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemSecondaryAction,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box, flexbox } from '@mui/system';
const Editor = ({ text, changeAt, index }) => {
	const [inputFocused, setInputFocused] = useState(false);
	

	const handleKeyDown = (e) => {
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	
	return (
		<React.Fragment>
		<Box sx={{ display: 'flex' }}>
			<textarea
				type="text"
				onKeyDown={handleKeyDown}
				onFocus={() => setInputFocused(true)}
				onBlur={() => setInputFocused(false)}
				onChange={(event) => {
					changeAt(index, event.target.value)
				}}
				
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
