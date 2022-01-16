import React, { useEffect, useState } from "react"
import Card from "./card"

const PredictionList =({question}) => {

    const [questions,setQuestions]=useState([
    ])
    useEffect(()=>{
        let postData={question:question}
        fetch("http://localhost:5000", {
            body: JSON.stringify(postData),
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST"
          }).then(res => res.json()).then(sim=>{
              console.log(sim)
            //   console.log(sim)
            setQuestions(sim)
          }).catch(err=>{
              console.log("fetch error")
              console.log(err)
          })

    },[question])
    return (
        
        <div>
            {question.length>10 && question.length<20 && <Card text={"Matching similarity..."}/>}
            {question.length>20 && Object.keys(questions).map((key,index)=>{
                // console.log(question,index);
                return <Card text={key} key={index}/>
            })}
        
        </div>
    )
}
export default PredictionList;