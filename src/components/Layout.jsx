import React, { useState } from 'react';
import { arrayMoveImmutable } from 'array-move';
import { Container, Draggable } from 'react-smooth-dnd';

import { Container as MuiContainer } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { List, ListItem } from '@mui/material';

import Editor from './Editor';
import NavBar from './NavBar';
import TopBar from './TopBar';

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
		if (
			newQuestion === '' &&
			questions.length > index &&
			questions[index] === ''
		) {
			return;
		}
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

	const changeAndAdd = (index, newQuestion) => {
		console.log('chage and add', index, newQuestion);
		let copy = [...questions];
		copy[index] = newQuestion;
		if (questions.length > index + 1 && questions[index + 1] === '') {
			setQuestions(copy);
			setNewBlockPos(index + 1);
			return;
		}

		copy.splice(index + 1, 0, '');
		setQuestions(copy);
		setNewBlockPos(index + 1);
	};

	const onDrop = ({ removedIndex, addedIndex }) => {
		const new_ = arrayMoveImmutable(questions, removedIndex, addedIndex);
		setQuestions(new_);
	};

	const handleUploadClick = (e, setUploading) => {
		e.preventDefault();
		let file = e.target.files[0];
		// console.log(file);

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
				e.target.value = null;
			})
			.catch((e) => {
				console.log('Error occured while uploading', e);
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
								questions.map((item, index) => {
									// console.log('here ere', index, item);
									// console.log(item);
									return (
										<Draggable key={index}>
											<ListItem>
												<Editor
													text={item}
													changeAndAdd={(text) => {
														changeAndAdd(index, text);
													}}
													changeAt={changeQuestionAt}
													index={index}
													addAt={addQuestionAt}
													newBlockPos={newBlockPos}
													setNewBlockPos={setNewBlockPos}
													deleteAt={deleteAt}
												/>
											</ListItem>
										</Draggable>
									);
								})}
						</Container>
					</List>
				</Paper>
			</MuiContainer>
		</React.Fragment>
	);
}

export default Layout;
