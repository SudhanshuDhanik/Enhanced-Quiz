import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { createQuestion, getSubjects } from "../../../utils/QuizService"

const AddQuestion = () => {
	const [question, setQuestionText] = useState("")
	const [questionType, setQuestionType] = useState("single")
	const [choices, setChoices] = useState([""])
	const [correctAnswers, setCorrectAnswers] = useState([""])
	const [subject, setSubject] = useState("")
	const [newSubject, setNewSubject] = useState("")
	const [subjectOptions, setSubjectOptions] = useState([""])

	useEffect(() => {
		fetchSubjects()
	}, [])

	const fetchSubjects = async () => {
		try {
			const subjectsData = await getSubjects()
			setSubjectOptions(subjectsData)
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddChoice = () => {
		const lastChoice = choices[choices.length - 1]
		const lastChoiceLetter = lastChoice ? lastChoice.charAt(0) : "A"
		const newChoiceLetter = String.fromCharCode(lastChoiceLetter.charCodeAt(0) + 1)
		const newChoice = `${newChoiceLetter}.`
		setChoices([...choices, newChoice])
	}

	const handleRemoveChoice = (index) => {
		setChoices(choices.filter((choice, i) => i !== index))
	}

	const handleChoiceChange = (index, value) => {
		setChoices(choices.map((choice, i) => (i === index ? value : choice)))
	}

	const handleCorrectAnswerChange = (index, value) => {
		setCorrectAnswers(correctAnswers.map((answer, i) => (i === index ? value : answer)))
	}

	const handleAddCorrectAnswer = () => {
		setCorrectAnswers([...correctAnswers, ""])
	}

	const handleRemoveCorrectAnswer = (index) => {
		setCorrectAnswers(correctAnswers.filter((answer, i) => i !== index))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const result = {
				question,
				questionType,
				choices,
				correctAnswers: correctAnswers.map((answer) => {
					const choiceLetter = answer.charAt(0).toUpperCase()
					const choiceIndex = choiceLetter.charCodeAt(0) - 65
					return choiceIndex >= 0 && choiceIndex < choices.length ? choiceLetter : null
				}),
				subject
			}

			await createQuestion(result)

			setQuestionText("")
			setQuestionType("single")
			setChoices([""])
			setCorrectAnswers([""])
			setSubject("")
		} catch (error) {
			console.error(error)
		}
	}

	const handleAddSubject = () => {
		if (newSubject.trim() !== "") {
			setSubject(newSubject.trim())
			setSubjectOptions([...subjectOptions, newSubject.trim()])
			setNewSubject("")
		}
	}

	return (
		<div className="pt-20 px-4 md:px-8 max-w-4xl mx-auto h-[calc(100vh-4rem)] overflow-y-auto scrollbar-hide">
		  <div className="bg-gray-100 shadow-lg rounded-xl p-8">
			{/* Fully dark title */}
			
			<div className="text-3xl font-bold mb-6 text-gray-900 ">
				<h2>
					Add New Qestion
				</h2>
			</div>
	  
			<form onSubmit={handleSubmit} className="space-y-6 text-base text-gray-900">
			  {/* Subject Selection */}
			  <div>
				<label htmlFor="subject" className="block font-semibold mb-1">
				  Select a Category
				</label>
				<select
				  id="subject"
				  value={subject}
				  onChange={(e) => setSubject(e.target.value)}
				  className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
				  <option value="">Select category</option>
				  <option value="New">Add New</option>
				  {subjectOptions.map((option) => (
					<option key={option} value={option}>
					  {option}
					</option>
				  ))}
				</select>
			  </div>
	  
			  {/* New Subject Input */}
			  {subject === "New" && (
				<div>
				  <label htmlFor="new-subject" className="block font-semibold mb-1">
					Add New Subject
				  </label>
				  <input
					type="text"
					id="new-subject"
					value={newSubject}
					onChange={(e) => setNewSubject(e.target.value)}
					className="w-full border border-gray-400 rounded-lg px-4 py-3 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				  />
				  <button
					type="button"
					onClick={handleAddSubject}
					className="text-indigo-700 text-sm font-medium hover:underline"
				  >
					Add Subject
				  </button>
				</div>
			  )}
	  
			  {/* Question Text */}
			  <div>
				<label className="block font-semibold mb-1">Question</label>
				<textarea
				  rows={4}
				  value={question}
				  onChange={(e) => setQuestionText(e.target.value)}
				  className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				/>
			  </div>
	  
			  {/* Question Type */}
			  <div>
				<label className="block font-semibold mb-1">Question Type</label>
				<select
				  value={questionType}
				  onChange={(e) => setQuestionType(e.target.value)}
				  className="w-full border border-gray-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
				>
				  <option value="single">Single Answer</option>
				  <option value="multiple">Multiple Answer</option>
				</select>
			  </div>
	  
			  {/* Choices */}
			  <div>
				<label className="block font-semibold mb-2">Choices</label>
				{choices.map((choice, index) => (
				  <div key={index} className="flex items-center gap-2 mb-2">
					<input
					  type="text"
					  value={choice}
					  onChange={(e) => handleChoiceChange(index, e.target.value)}
					  className="flex-1 border border-gray-400 rounded-lg px-4 py-2"
					/>
					<button
					  type="button"
					  onClick={() => handleRemoveChoice(index)}
					  className="text-red-600 text-sm font-medium hover:underline"
					>
					  Remove
					</button>
				  </div>
				))}
				<button
				  type="button"
				  onClick={handleAddChoice}
				  className="text-indigo-700 text-sm font-medium hover:underline"
				>
				  Add Choice
				</button>
			  </div>
	  
			  {/* Correct Answers */}
			  {questionType === "single" ? (
				<div>
				  <label className="block font-semibold text-green-800 mb-1">Correct Answer</label>
				  <input
					type="text"
					value={correctAnswers[0]}
					onChange={(e) => handleCorrectAnswerChange(0, e.target.value)}
					className="w-full border border-gray-400 rounded-lg px-4 py-3"
				  />
				</div>
			  ) : (
				<div>
				  <label className="block font-semibold text-green-800 mb-1">Correct Answer(s)</label>
				  {correctAnswers.map((answer, index) => (
					<div key={index} className="flex items-center gap-2 mb-2">
					  <input
						type="text"
						value={answer}
						onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
						className="flex-1 border border-gray-400 rounded-lg px-4 py-2"
					  />
					  {index > 0 && (
						<button
						  type="button"
						  onClick={() => handleRemoveCorrectAnswer(index)}
						  className="text-red-600 text-sm font-medium hover:underline"
						>
						  Remove
						</button>
					  )}
					</div>
				  ))}
				  <button
					type="button"
					onClick={handleAddCorrectAnswer}
					className="text-indigo-700 text-sm font-medium hover:underline"
				  >
					Add Correct Answer
				  </button>
				</div>
			  )}
	  
			  {/* Buttons */}
			  <div className="flex gap-4 mt-6">
				<button
				  type="submit"
				  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
				>
				  Save Question
				</button>
				<Link
				  to="/all-quizzes"
				  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
				>
				  Back to Questions
				</Link>
			  </div>
			</form>
		  </div>
		</div>
	  )
	  
		
}

export default AddQuestion
