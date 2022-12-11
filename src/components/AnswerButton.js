import React from "react";

export default function AnswerButton(props){
    var bg_color = ''
    const isCorrectAnswer = props.value === props.correct_answer
    if(props.check_ans){
        if(isCorrectAnswer){
            bg_color = 'Green'
        }else if(props.isChosen && !isCorrectAnswer){
            bg_color = 'Red'
        }
    }else {
        bg_color = props.isChosen ? 'Blue' : null
    }

    const styles = {
        backgroundColor: bg_color
    }

    
    return(
        <div
        onClick = {props.chooseAnswer}
        >
            <button style={styles} disabled={props.disabled}>{props.value}</button>
        </div>
    )
}