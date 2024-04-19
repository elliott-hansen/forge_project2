import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Button from '@mui/material/Button';
import './App.css'


// async call to api, returns 'questions' object containing 10 generated questions.
var url = "https://the-trivia-api.com/v2/questions";
const questions = await fetch(url, {method: "GET"})
    .then(Result => Result.json())
    .then(string => {
        return string;
    });

function toChoiceObj(choice, correct=false) {
    var choice = {
        choiceText: choice,
        isCorrect: correct,
    }
    return choice
}

function QuestionBox(question) {
    const question_head = question.question.question.text; // wtf?
    const incorrect_choices = question.question.incorrectAnswers;
    const correct_choice = question.question.correctAnswer;
    var total_choices = incorrect_choices.map((choice) => toChoiceObj(choice, false));
    total_choices.push(toChoiceObj(correct_choice, true))
    // Shuffle choices, Schwartzian Transform from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    total_choices = total_choices
        .map(value => ({value, sort: Math.random()}))
        .sort((a,b) => a.sort - b.sort)
        .map (({value}) => value)
    console.log(total_choices);
    return (
        <>
            <div className="question-box-main">
                <h3 className="question-box-header">
                    {question_head}
                </h3>
                <div className="question-box-choices">
                    {total_choices.map((choice, i) => <QuestionChoice choice={choice} key={i}/>)}
                </div>
            </div>
        </>
    )
}

function QuestionChoice(choice) {
    var isCorrect = choice.choice.isCorrect
    const [clicked, setClicked] = useState(false);
    const handleClick = () => {
        setClicked(!clicked);
    }
    const statusColor = isCorrect? "success" : "error";
    return (
        <>
            <div className="choice-box">
                <Button 
                    variant='text'
                    onClick={handleClick}
                    color={clicked? statusColor : "primary"}
                >
                    {choice.choice.choiceText}
                </Button>
            </div>
        </>
    )
}

function App() {
  console.log(questions);
  return (
    <>
        {questions.map((question, i) => <QuestionBox question={question} key={i}/>)}
    </>
  )
}

export default App
