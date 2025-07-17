import React from "react"
import {Link, useLocation} from "react-router-dom"

 const QuizResult = () => {
		const location = useLocation()
		const { quizQuestions, totalScores } = location.state
		const numQuestions = quizQuestions.length
		const percentage = Math.round((totalScores / numQuestions) * 100)

		return (
			<section className="mt-5">
				<h3 className="text-primary"> Your Quiz Result Summary
				<hr className="text-primary" /></h3>
				<h5 className="text-info">
					You answered {totalScores} out of {numQuestions} questions correctly.
					<br />
				<p className="text-dark">Your total score is {percentage}%.</p>
				</h5>
				<button type="button" className="btn btn-light">
			<Link to={"/"}>Back to Home</Link>
			</button>
				
			</section>
		)
 }

 export default QuizResult