import { Typography, Container as MuiContainer, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import Editor from './components/Editor';

import ReactDOM from 'react-dom';
import { Container, Draggable } from 'react-smooth-dnd';
import { arrayMoveImmutable } from 'array-move';

import {
	List,
	ListItem,

} from '@mui/material';



function App() {
	const [num, setNum] = useState(1);
  const [questions, setQuestions] = useState(['']);
	
  const addQuestionAt = (index, newQuestion)=>{
    let copy = questions
    copy[index] = newQuestion
    setQuestions(copy)
  }


	const onDrop = ({ removedIndex, addedIndex }) => {
    console.log(removedIndex, addedIndex)
    const new_  = arrayMoveImmutable(questions, removedIndex, addedIndex)
    console.log(new_);
		setQuestions(new_);
	};

	return (
		<React.Fragment>
			<CssBaseline enableColorScheme />
			<MuiContainer sx={{ minHeight: '100vh' }} maxWidth="md" disableGutters>
				<Box
					style={{
						backgroundColor: '#ebebeb',
						minHeight: '100vh',
					}}
				>
					<Typography
						variant="h4"
						component="h1"
						sx={{ textAlign: 'center', py: 3 }}
					>
						Realtime Text Similarity Identification
					</Typography>
					{/* {Array(num)
						.fill(0)
						.map((_, i) => (
							<Editor />
						))} */}

					<List>
						<Container
							dragHandleSelector=".drag-handle"
							lockAxis="y"
							onDrop={onDrop}
						>
							{questions &&
								questions.map((item, index) => (
									<Draggable key={index}>
										<ListItem>
                      <Editor text={item} changeAt={addQuestionAt} index={index}/>
										</ListItem>
									</Draggable>
								))}
						</Container>
					</List>
					<p onClick={() => setQuestions([...questions, ''])}>
						Add New Question
					</p>

				</Box>
			</MuiContainer>
		</React.Fragment>
	);
}

export default App;
