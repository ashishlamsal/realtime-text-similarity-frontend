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

	const [items, setItems] = useState([
		{ id: '1', text: 'Item 1' },
		{ id: '2', text: 'Item 2' },
		{ id: '3', text: 'Item 3' },
		{ id: '4', text: 'Item 4' },
	]);

	const onDrop = ({ removedIndex, addedIndex }) => {
		setItems((items) => arrayMoveImmutable(items, removedIndex, addedIndex));
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
							{num &&
								Array(num).fill(0).map((item, index) => (
									<Draggable key={index}>
										<ListItem>
                      <Editor />
										</ListItem>
									</Draggable>
								))}
						</Container>
					</List>
					<p onClick={() => setNum(num + 1)}>Add New Question</p>

				</Box>
			</MuiContainer>
		</React.Fragment>
	);
}

export default App;
