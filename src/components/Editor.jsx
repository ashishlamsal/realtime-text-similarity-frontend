import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './styles.scss';
import PredictionList from './predictionList';
import { onBlur } from 'draft-js/lib/DraftEditorEditHandler';

const Abc = () => {
	const [inputFocused, setInputFocused] = useState(false);
  const [question,setQuestion]=useState("");

	return (
		<div>
			<input
				type="text"
				onFocus={() => setInputFocused(true)}
				onBlur={() => setInputFocused(false)}
        onChange={(event)=>setQuestion(event.target.value)}
			/>
			{inputFocused && <PredictionList question={question}/>}
		</div>
	);
};
export default Abc;
