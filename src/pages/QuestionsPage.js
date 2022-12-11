import React from "react";
import { useState, useEffect } from "react";
import AnswerButton from "../components/AnswerButton";
// import Loader from "../components/Loader"
import { nanoid } from 'nanoid';
import sanitizeHtml from "sanitize-html";

export default function QuestionsPage(){
    const [inputData, setInputData] = useState([])
    const [allQuestionsData, setAllQuestionsData] = useState([])
    const [seeScore, setSeeScore] = useState(false)
    const [playAgain, setPlayAgain] = useState(false)

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&category=21")
        .then(res => res.json())
        .then(data => setInputData(data.results))
    }, [playAgain])

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


    function checkAnswers(){
        setSeeScore(true)
    }

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

    function calculateScore(){
        
        const scoreList = allQuestionsData.map(question => {
            const score = question.answers.map(answer => {
                return (answer.isChosen && answer.answerVal === question.correct_answer) ? 1 : 0
            })
            return score 
        })

        let sum = 0
        for(let i = 0; i < scoreList.length; i++){
            for(let j = 0; j < 4; j++){
                sum += scoreList[i][j]
            }
        }
        return +sum
    }

    function resetGame(){
        setPlayAgain(oldValue => !oldValue)
        setSeeScore(false)
    }

    const questionsList = allQuestionsData.map((question) => {
        const answerList = question.answers.map(answer => <AnswerButton value={answer.answerVal} 
                                                                        key ={answer.id}
                                                                        isChosen ={answer.isChosen}
                                                                        chooseAnswer ={()=> choose(answer.id)}
                                                                        disabled={(question.answer_chosen && !answer.isChosen) ? true : false}
                                                                        check_ans={seeScore}
                                                                        correct_answer={question.correct_answer}/>)
        return(
           <div>
                <p dangerouslySetInnerHTML={{__html: sanitizeHtml(question.question)}} />
                {answerList}
                <hr/>
            </div>
        )
    })


    return(
        <div>
            {questionsList}
            {seeScore && <p>Your score is {calculateScore()}</p>}
            <button onClick={checkAnswers}>Check Answers</button>
            <button onClick={resetGame}>Play Again</button>
        </div>
    )
}