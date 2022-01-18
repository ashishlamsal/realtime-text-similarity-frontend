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

export default function SimpleAccordion({ inputFocused, children, question }) {
	const [expand, setExpand] = React.useState(false);
	const handleToggle = () => {
		setExpand(!expand);
	};
	const [questions, setQuestions] = useState([]);
	useEffect(() => {
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
				console.log(sim);
				//   console.log(sim)
				setQuestions(sim);
			})
			.catch((err) => {
				console.log('fetch error');
				console.log(err);
			});
	}, [question]);

	return (
		<div style={{width:"100%"}}>
			<Accordion expanded={inputFocused || expand}>
				{/* {propes.children} */}
				<AccordionSummary
					expandIcon={<ExpandMoreIcon onClick={handleToggle} />}
					aria-controls="panel1a-content"
					id="panel1a-header"
					// IconButtonProps={{ onclick: handleToggle }}
				>
					{children}
				</AccordionSummary>
				<AccordionDetails>
					<div>
						{question && question.length > 10 && question.length < 20 && (
							// <Card text={'Matching similarity...'} />
							<Typography>Matching similarity...</Typography>
						)}
						{question &&
							question.length > 20 &&
							Object.keys(questions).map((key, index) => {
								// console.log(question,index);
								// return <Card text={key} key={index} />;
								return (
									<Typography key={index}>
										{key}
									</Typography>
								);
							})}
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
}
