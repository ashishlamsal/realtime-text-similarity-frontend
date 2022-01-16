import React, { useState } from 'react';
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
const Abc = () => {
	const [inputFocused, setInputFocused] = useState(false);
	const [question, setQuestion] = useState('');

	const handleKeyDown = (e) => {
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
	};

	return (
		<Box sx={{display:"flex"}}>
			<textarea
				type="text"
				onKeyDown={handleKeyDown}
				onFocus={() => setInputFocused(true)}
				onBlur={() => setInputFocused(false)}
				onChange={(event) => {
					setQuestion(event.target.value);
				}}
			/>
			<ListItemIcon className="drag-handle">
				<DragHandleIcon />
			</ListItemIcon>
			{inputFocused && <PredictionList question={question} />}
		</Box>
	);
};
export default Abc;
