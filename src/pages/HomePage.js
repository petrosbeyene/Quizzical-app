import React from "react";

export default function HomePage(props){

    // fetch("https://opentdb.com/api.php?amount=10&category=21&type=multiple")
    //     .then(res => res.json())
    //     .then(data => console.log(data))


    return(
        <div>
            <h1>Quizzical</h1>
            <p>We are the best platform to test your general knowledge!</p>
            <button onClick={props.showResult}>Start quiz</button>
        </div>
    )
}