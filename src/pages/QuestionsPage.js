import React from "react";

export default function QuestionsPage(){
    const [questionData, setQuestionData] = React.useState({})

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&category=21&type=multiple")
        .then(res => res.json())
        .then(data => setQuestionData(data))
    })

    return(
        <div>{JSON.stringify(questionData, null, 2)}</div>
    )
}