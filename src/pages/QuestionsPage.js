import React from "react";
import { useState, useEffect } from "react";
import AnswerButton from "../components/AnswerButton";
import { nanoid } from 'nanoid';

export default function QuestionsPage(){
    const [inputData, setInputData] = useState([])
    const [allQuestionsData, setAllQuestionsData] = useState([])

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=21")
        .then(res => res.json())
        .then(data => setInputData(data.results))
    }, [])

    function getAllQuestionandAnswers(){
        const questionAndAnswers = inputData.map(questionObj => {
        
            const listOfAnswers = questionObj.incorrect_answers
            if(!questionObj.incorrect_answers.includes(questionObj.correct_answer)){
                let randomIndex = Math.floor(Math.random() * 4)
                listOfAnswers.splice(randomIndex, 0, questionObj.correct_answer)
            }
    
            const answers = listOfAnswers.map(answer => {
                return {answerVal: answer, isChosen: false, id: nanoid()}
            })
            
            return(
                {
                    question: questionObj.question,
                    difficulty: questionObj.difficulty,
                    correct_answer: questionObj.correct_answer,
                    answers: answers,
                    answer_chosen: false,
                }
            
            )
        })

        return questionAndAnswers
    }

    useEffect(()=>{
        setAllQuestionsData(getAllQuestionandAnswers())
    },[inputData])


    function choose(id){
        setAllQuestionsData(oldAllQuestionsData => oldAllQuestionsData.map(questionObject => {
            const newAnswers = questionObject.answers.map(answer => {
                if (id === answer.id){
                    questionObject.answer_chosen = !questionObject.answer_chosen
                    return {...answer, isChosen: !answer.isChosen}
                }else{
                    return answer
                }
            })
            return {...questionObject, answers: newAnswers}
        }))
    }

    const questionsList = allQuestionsData.map((question) => {
        const answerList = question.answers.map(answer => <AnswerButton value={answer.answerVal} 
                                                                        key ={answer.id}
                                                                        isChosen ={answer.isChosen}
                                                                        chooseAnswer ={()=> choose(answer.id)}
                                                                        disabled={(question.answer_chosen && !answer.isChosen) ? true : false}/>)
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
            <button>Submit</button>
        </div>
    )
}