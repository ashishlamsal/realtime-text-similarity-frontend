import { useEffect, useState } from 'react';
// import Card from "./card"

// const PredictionList =({question}) => {

//     const [questions,setQuestions]=useState([
//     ])
//     useEffect(()=>{
//         let postData={question:question}
//         fetch("http://localhost:5000", {
//             body: JSON.stringify(postData),
//             headers: {
//               "Content-Type": "application/json"
//             },
//             method: "POST"
//           }).then(res => res.json()).then(sim=>{
//               console.log(sim)
//             //   console.log(sim)
//             setQuestions(sim)
//           }).catch(err=>{
//               console.log("fetch error")
//               console.log(err)
//           })

//     },[question])
//     return (

// <div>
//     {question && question.length>10 && question.length<20 && <Card text={"Matching similarity..."}/>}
//     {question && question.length>20 && Object.keys(questions).map((key,index)=>{
//         // console.log(question,index);
//         return <Card text={key} key={index}/>
//     })}

// </div>
//     )
// }
// export default PredictionList;

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

export default function SimpleAccordion({ inputFocused, children, question }) {
	const [expand, setExpand] = React.useState(false);
	const handleToggle = () => {
		setExpand(!expand);
	};
	const [questions, setQuestions] = useState([]);
	useEffect(() => {
		let postData = { question: question };
		fetch('http://127.0.0.1:5000', {
			body: JSON.stringify(postData),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		})
			.then((res) => res.json())
			.then((sim) => {
				// console.log(sim);
				setQuestions(sim);
			})
			.catch((err) => {
				setQuestions({
					'Some error occured while making request to backend': 0,
				});
			});
	}, [question]);

	return (
		<div style={{ width: '100%' }}>
			<Accordion expanded={inputFocused || expand} disableGutters>
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
									return (
										<ListItem key={index} disablePadding>
											<ListItemButton sx={{paddingBottom: "1px", mb:"0"}}>
												<ListItemIcon>
													<Typography sx={{ marginBottom:"0", lineHeight: "inherit" }} variant="button" display="block">
														{index + 1}
													</Typography>
												</ListItemIcon>
												<ListItemText >
													<Typography sx={{ marginBottom:"0", lineHeight: "inherit" }} variant="subtitle2" gutterBottom>
														{key}
													</Typography>
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
