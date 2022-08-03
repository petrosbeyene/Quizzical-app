import React from "react"
import HomePage from "./pages/HomePage"
import QuestionsPage from "./pages/QuestionsPage"

export default function App() {
  const [showResult, setShowResult] = React.useState(false)

  const clickHandler = () => {
    setShowResult(prevShowResult => !prevShowResult)
  }

  return(
    <div>
        {showResult ? <QuestionsPage/>: <HomePage showResult = {clickHandler} />}
    </div>
    
  )
}
