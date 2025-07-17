import React, { useEffect, useState } from "react"
import { deleteQuestion, getAllQuestions } from "../../../utils/QuizService"
import { Link } from "react-router-dom"
import { FaPlus } from "react-icons/fa"

const GetAllQuiz = () => {
	const [questions, setQuestions] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [deleteSuccess, setDeleteSuccess] = useState("")

	useEffect(() => {
		fetchQuestions()
	}, [])

	const fetchQuestions = async () => {
		try {
			const data = await getAllQuestions()
			setQuestions(data)
			setIsLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const handleDeleteQuestion = async (id) => {
		try {
			await deleteQuestion(id)
			setQuestions(questions.filter((question) => question.id !== id))
			setDeleteSuccess("Question deleted successfully.")
			setTimeout(() => setDeleteSuccess(""), 4000)
		} catch (error) {
			console.error(error)
		}
	}

	if (isLoading) {
		return <p className="text-center text-lg font-semibold text-gray-700 mt-10">Loading...</p>
	}

	return (
		<section className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 pt-30 bg-white">

			<div className="max-w-5xl mx-auto">
				<div className="flex flex-col sm:flex-row items-center justify-between mb-8">
					<h2 className="text-3xl font-bold text-black mb-4 sm:mb-0">All Quiz Questions</h2>
					<Link
						to="/create-quiz"
						className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
					>
						<FaPlus />
						Add Question
					</Link>
				</div>

				{deleteSuccess && (
					<div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
						{deleteSuccess}
					</div>
				)}

				{questions.map((question, index) => (
					<div
						key={question.id}
						className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-6 shadow-sm transition hover:shadow-md"
					>
						<h3 className="text-xl font-semibold text-black mb-3">
							{index -4}. {question.question}
						</h3>

						<ul className="list-disc list-inside text-black mb-4">
							{question.choices.map((choice, idx) => (
								<li key={idx}>{choice}</li>
							))}
						</ul>

						<p className="text-black font-medium mb-4">
							✅ Correct Answer(s):{" "}
							{question.correctAnswers && question.correctAnswers.length > 0
								? Array.isArray(question.correctAnswers)
									? question.correctAnswers.join(", ")
									: question.correctAnswers
								: "Not specified"}
						</p>

						<div className="flex flex-col sm:flex-row gap-3">
							<Link
								to={`/update-quiz/${question.id}`}
								className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
							>
								✏️ Edit
							</Link>
							<button
								onClick={() => handleDeleteQuestion(question.id)}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
							>
								🗑️ Delete
							</button>
						</div>
					</div>
				))}
			</div>
		</section>
	)
}

export default GetAllQuiz
