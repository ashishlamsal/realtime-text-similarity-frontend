import { Container as MuiContainer } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React, { useState } from 'react';
import Editor from './Editor';
import TopBar from './TopBar';
import NavBar from './NavBar';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Container, Draggable } from 'react-smooth-dnd';
import { arrayMoveImmutable } from 'array-move';

import { List, ListItem } from '@mui/material';

function Layout({ context }) {
	const theme = useTheme();
	const colorMode = React.useContext(context);
	const [questions, setQuestions] = useState(['']);
	const [newBlockPos, setNewBlockPos] = useState(-1);
	const [uploadSuccess, setUploadSuccess] = useState(false);
	const [uploadFailed, setUploadFailed] = useState(false);
	const [currentDatabase, setCurrentDatabase] = useState('Quora');

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
		if (old.length === 0) {
			old.push('');
		}
		setQuestions(old);
	};

	const onDrop = ({ removedIndex, addedIndex }) => {
		const new_ = arrayMoveImmutable(questions, removedIndex, addedIndex);
		setQuestions(new_);
	};

	const handleUploadClick = (e, setUploading) => {
		e.preventDefault();
		let file = e.target.files[0];
		console.log(file);

		const formData = new FormData();

		formData.append('file', file);
		setUploading(true);

		fetch('http://localhost:5000/files', {
			body: formData,
			method: 'POST',
		})
			.then((res) => res.json())
			.then((res) => {
				setUploading(false);
				setUploadSuccess(!uploadSuccess);
				console.log(res);
				setCurrentDatabase(e.target.files[0].name);
			})
			.catch((e) => {
				console.log('error occured while uploading', e);
				setUploadFailed(!uploadFailed);
				setUploading(false);
			});
	};

	return (
		<React.Fragment>
			<CssBaseline enableColorScheme />
			<NavBar
				colorMode={colorMode}
				theme={theme}
				handleUploadClick={handleUploadClick}
				currentDatabase={currentDatabase}
			/>
			<MuiContainer maxWidth="md">
				<Paper
					elevation={1}
					square
					sx={{
						minHeight: '100vh',
						my: 2,
						color: 'text.primary',
					}}
				>
					<TopBar
						questions={questions}
						setQuestions={setQuestions}
						uploadCompleted={uploadSuccess}
						uploadFailed={uploadFailed}
						setCurrentDatabase={setCurrentDatabase}
					/>

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
				</Paper>
			</MuiContainer>
		</React.Fragment>
	);
}

export default Layout;
