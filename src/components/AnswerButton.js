import React from "react";

export default function AnswerButton(props){
    const styles = {
        backgroundColor: props.isChosen ? 'Green' : null
    }
    return(
        <div style={styles}
        onClick = {props.chooseAnswer}
        >
            <p>{props.isChosen ? 'true': 'false'}</p>
            <button>{props.value}</button>
        </div>
    )
}