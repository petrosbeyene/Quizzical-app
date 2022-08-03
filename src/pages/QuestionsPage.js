import React from "react";
import AnswerButton from "../components/AnswerButton";

export default function QuestionsPage(){
    const [questionData, setQuestionData] = React.useState({})


    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&category=21&type=multiple")
        .then(res => res.json())
        .then(data => setQuestionData(data))
    }, [])

    const questions = questionData.results.map(question => {
        return(
            <div>
                  <span>{question.question} (difficulty--{question.difficulty})</span><br/>
                  <AnswerButton value ={question.correct_answer}/>
                  <AnswerButton value ={question.incorrect_answers[0]}/>
                  <AnswerButton value ={question.incorrect_answers[1]}/>
                  <AnswerButton value ={question.incorrect_answers[2]}/>
                  <hr/>
            </div>
        )
    })

    return(
        <div>{questions}</div>
    )
}