import React from "react";
import { useState, useEffect } from "react";
import AnswerButton from "../components/AnswerButton";

export default function QuestionsPage(){
    const [questionData, setQuestionData] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&category=21&type=multiple")
        .then(res => res.json())
        .then(data => setQuestionData(data.results))
    }, [])


    const questionAndAnswers = questionData.map(questionObj => {
        
        const listOfAnswers = questionObj.incorrect_answers
        if(!questionObj.incorrect_answers.includes(questionObj.correct_answer)){
            let randomIndex = Math.floor(Math.random() * 4)
            listOfAnswers.splice(randomIndex, 0, questionObj.correct_answer)
        }
        
        return(
            {
                question: questionObj.question,
                difficulty: questionObj.difficulty,
                correct_answer: questionObj.correct_answer,
                answers: listOfAnswers,
            }
        
        )
    })

    const questionsList = questionAndAnswers.map((question) => {
        const answerList = question.answers.map(answer => <AnswerButton value={answer} />)
        return(
           <div>
                <span>{question.question} (difficulty--{question.difficulty})</span><br/>
                {answerList}
                <hr/>
            </div>
        )
    })

    return(
        <div>
            {questionsList}
        </div>
    )
}