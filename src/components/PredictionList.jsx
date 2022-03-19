import { useEffect, useState } from 'react';
import * as React from 'react';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';

export default function SimpleAccordion({
	textArea,
	inputFocused,
	children,
	question,
	setText,
	addAt,
	setNewBlockPos,
	question_no,
	changeAt,
	changeAndAdd,
}) {
	const [expand, setExpand] = React.useState(false);
	const handleToggle = () => {
		setExpand(!expand);
	};
	const [focusedInput, setFocusedInput] = useState(false);
	const [questions, setQuestions] = useState([]);
	// const timer = setTimeout(() => {}, 0.5);
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			let postData = { question: question };
			fetch('http://localhost:5000', {
				body: JSON.stringify(postData),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			})
				.then((res) => res.json())
				.then((sim) => {
					// console.log('req');
					setQuestions(sim);
				})
				.catch((err) => {
					setQuestions({
						'Some error occured while making request to backend': 0,
					});
				});
		}, 200);

		return () => clearTimeout(delayDebounceFn);
	}, [question]);

	useEffect(() => {
		setTimeout(() => {
			setFocusedInput(inputFocused);
		}, 100);
	}, [inputFocused]);

	const onClickItem = (index) => {
		if (index < questions.length) {
			changeAndAdd(questions[index][0].trimRight());

			// }, 200);
		}
	};

	const gradient = [
		'#42b63c',
		'#61b222',
		'#7aac00',
		'#90a600',
		'#a49f00',
		'#b69700',
		'#c88e00',
		'#d98300',
		'#e87700',
		'#f6690c',
	];

	return (
		<div style={{ width: '100%' }}>
			<Accordion expanded={focusedInput || expand} disableGutters>
				{/* {propes.children} */}
				<AccordionSummary
					expandIcon={<ExpandMoreIcon onClick={handleToggle} />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					// IconButtonProps={{ onclick: handleToggle }}
				>
					{children}
				</AccordionSummary>
				{question && question.length > 10 && (
					<AccordionDetails>
						{question && question.length <= 20 && (
							<Typography
								variant="overline"
								component="div"
								gutterBottom
								sx={{ fontWeight: 'bold', lineHeight: 'normal', pt: '2' }}
							>
								Matching similarity...
							</Typography>
						)}
						{question && question.length > 20 && (
							<List>
								<Typography
									variant="overline"
									component="div"
									gutterBottom
									sx={{ fontWeight: 'bold', lineHeight: 'normal' }}
								>
									Similar Questions
								</Typography>
								{questions.map((key, index) => {
									const ind = parseInt(Number(key[1]) * 10);
									const color = gradient[gradient.length - ind];
									return (
										<ListItem key={index} disablePadding>
											<ListItemButton
												onClick={() => {
													onClickItem(index);
												}}
												sx={{ paddingBottom: '1px', mb: '0' }}
											>
												<ListItemIcon>
													<Typography
														sx={{ marginBottom: '0', lineHeight: 'inherit' }}
														variant="button"
														display="block"
													>
														{index + 1}
													</Typography>
												</ListItemIcon>

												<ListItemText>
													<Box
														sx={{
															display: 'flex',
															justifyContent: 'space-between',
														}}
													>
														<Typography
															sx={{ marginBottom: '0', lineHeight: 'inherit' }}
															variant="subtitle2"
															gutterBottom
														>
															{key[0]}
														</Typography>

														<Typography
															sx={{
																marginBottom: '0',
																lineHeight: 'inherit',
																color: color,
															}}
															variant="subtitle2"
															gutterBottom
														>
															{Number(key[1]).toFixed(3)}
														</Typography>
													</Box>
												</ListItemText>
											</ListItemButton>
										</ListItem>
									);
								})}
							</List>
						)}
					</AccordionDetails>
				)}
			</Accordion>
		</div>
	);
}
