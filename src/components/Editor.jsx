import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './styles.scss';
import PredictionList from './predictionList';
import { onBlur } from 'draft-js/lib/DraftEditorEditHandler';
import TextareaAutosize from 'react-textarea-autosize';

import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	ListItemSecondaryAction,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { Box, flexbox } from '@mui/system';


const Editor = ({ text, changeAt, index, addAt }) => {
	const [inputFocused, setInputFocused] = useState(false);

	const handleKeyDown = (e) => {
		
		if (e.code === 'Enter') {
			e.preventDefault();
			if (e.shiftKey) {
				addAt(index + 1, "");
			} else if (e.ctrlKey) {
				addAt(index, "");
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
						changeAt(index, event.target.value)
					}}
					value={text}

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
