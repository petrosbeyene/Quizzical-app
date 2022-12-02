// import React from "react";
// import { useState, useEffect } from "react";
// import { nanoid } from 'nanoid';
// import AnswerButton from "../components/AnswerButton";

// export default function QuestionsPage(){
//     const [inputData, setInputData] = useState([])
//     const [questionAndAnswers, setQuestionAndAnswers] = useState([])

//     useEffect(() => {
//         fetch("https://opentdb.com/api.php?amount=5&category=21")
//         .then(res => res.json())
//         .then(data => setInputData(data.results))
//     }, [])

//     function getAllQ_and_As(){
//         const allQuestionAndAnswers = inputData.map(questionObj => {
//             const listOfAnswers = questionObj.incorrect_answers
//             if(!questionObj.incorrect_answers.includes(questionObj.correct_answer)){
//                 let randomIndex = Math.floor(Math.random() * 4)
//                 listOfAnswers.splice(randomIndex, 0, questionObj.correct_answer)
//             }
            
//             const answers = listOfAnswers.map(answer => {
//                 return {answerValue: answer, isChosen: false, id: nanoid()}
//             })

//             return ({
//                     question: questionObj.question,
//                     difficulty: questionObj.difficulty,
//                     correct_answer: questionObj.correct_answer,
//                     answers: answers
//                 })
//         })

//         return allQuestionAndAnswers
//     }

//     useEffect(() => {
//         setQuestionAndAnswers(getAllQ_and_As())
//     }, [])

    // function choose(id){
    //     setQuestionAndAnswers(prevQuestionData => prevQuestionData.map(questionObject => {
    //         questionObject.answers.map(answer => {
    //             return id === answer.id ? {...answer, isHled: !answer.isChosen} : answer
    //         })
    //         return questionObject
    //     })) 
    // }

//     const questionsList = questionAndAnswers.map(quesAndAns => {
//         const answerList = quesAndAns.answers.map(answer => <AnswerButton key={answer.id} 
//                                                                         value={answer.answerValue} 
//                                                                         isChosen = {answer.isChosen} 
//                                                                         // choose ={()=> {choose(answer.id)}}
//                                                                         />)
//         return(
//            <div>
//                 <span>{quesAndAns.question} (difficulty--{quesAndAns.difficulty})</span><br/>
//                 {answerList}
//                 <hr/>
//             </div>
//         )
//     })

//     return(
//         <div>
//             {questionsList}
//         </div>
//     )
// }
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
                return id === answer.id ? {...answer, isChosen: !answer.isChosen} : answer
            })
            return {...questionObject, answers: newAnswers}
        })) 
    }

    const questionsList = allQuestionsData.map((question) => {
        const answerList = question.answers.map(answer => <AnswerButton value={answer.answerVal} 
                                                                        key ={answer.id}
                                                                        isChosen ={answer.isChosen}
                                                                        chooseAnswer ={()=> choose(answer.id)}/>)
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