import { Typography, Container as MuiContainer, Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import Editor from './components/Editor';
import TopBar from './components/TopBar';


import { Container, Draggable } from 'react-smooth-dnd';
import { arrayMoveImmutable, arrayMoveMutable } from 'array-move';

import { List, ListItem } from '@mui/material';

function App() {
	const [questions, setQuestions] = useState(['']);
	const [newBlockPos, setNewBlockPos] = useState(-1);

	const changeQuestionAt = (index, newQuestion) => {
		let copy = [...questions];
		copy[index] = newQuestion;
		setQuestions(copy);
	};

	const addQuestionAt = (index, newQuestion) => {
		let old = [...questions];
		old.splice(index, 0, newQuestion);
		setQuestions(old);
	};

	const deleteAt = (index) => {
		let old = [...questions];
		old.splice(index, 1);
		if (old.length == 0) {
			old.push('');
		}
		setQuestions(old);
	};

	const onDrop = ({ removedIndex, addedIndex }) => {
		const new_ = arrayMoveImmutable(questions, removedIndex, addedIndex);
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

					<TopBar questions={questions} setQuestions={setQuestions} />

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
											<Editor
												text={item}
												changeAt={changeQuestionAt}
												index={index}
												addAt={addQuestionAt}
												newBlockPos={newBlockPos}
												setNewBlockPos={setNewBlockPos}
												deleteAt={deleteAt}
											/>
										</ListItem>
									</Draggable>
								))}
						</Container>
					</List>
				</Box>
			</MuiContainer>
		</React.Fragment>
	);
}

export default App;
