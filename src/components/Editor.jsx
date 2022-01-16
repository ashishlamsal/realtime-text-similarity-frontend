import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import './styles.scss';
import PredictionList from './predictionList';
import { onBlur } from 'draft-js/lib/DraftEditorEditHandler';

const Editor = ({text}) => {
	const [inputFocused, setInputFocused] = useState(false);
  const [question,setQuestion]=useState("");

  useEffect(()=>{
	setQuestion(text);
  },[text])

	return (
		<div>
			<input
				type="text"
				onFocus={() => setInputFocused(true)}
				onBlur={() => setInputFocused(false)}
        onChange={(event)=>setQuestion(event.target.value)}
		value={question}
			/>
			{inputFocused && <PredictionList question={question}/>}
		</div>
	);
};
export default Editor;
