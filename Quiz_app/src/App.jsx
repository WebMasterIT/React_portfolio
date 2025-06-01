import { useEffect, useState } from 'react'
import { questions } from '../data/data.js'
import Result from './Result.jsx'
import Question from './Question.jsx'
import './App.css'

function App() {
	const [current, setCurrent] = useState(0)
	const [score, setScore] = useState(0)
	const [showResult, setShowResult] = useState(false)
	const savedScore = localStorage.getItem('lastScore')
	const [history, setHistory] = useState(() => {
		const saved = localStorage.getItem('quizHistory')
		return saved ? JSON.parse(saved) : []
	})

	const shuffleArray = array => {
		return [...array].sort(() => Math.random() - 0.5)
	}

	const [shuffledQuestions] = useState(() => shuffleArray(questions))

	const handleAnswer = selected => {
		if (selected === shuffledQuestions[current].answer) {
			setScore(prev => prev + 1)
		}

		const next = current + 1
		if (next < shuffledQuestions.length) {
			setCurrent(next)
		} else {
			const previous = JSON.parse(localStorage.getItem('quizHistory')) || []
			const newEntry = {
				score:
					selected === shuffledQuestions[current].answer ? score + 1 : score,
				total: shuffledQuestions.length,
				date: new Date().toLocaleString(),
			}
			const updated = [...previous, newEntry]
			localStorage.setItem('quizHistory', JSON.stringify(updated))
			setHistory(updated)

			setShowResult(true)
		}
	}

	useEffect(() => {
		if (showResult) {
			localStorage.setItem('lastScore', score)
		}
	}, [showResult])

	//  Функция перезапуска
	const restartQuiz = () => {
		setCurrent(0)
		setScore(0)
		setShowResult(false)
	}

	return (
		<>
			<div className='app'>
				<h1>Quiz App</h1>
				{savedScore && (
					<p>
						Прошлый результат: {savedScore} из {shuffledQuestions.length}
					</p>
				)}
				{history.length > 0 && !showResult && (
					<div className='history'>
						<h3>История попыток:</h3>
						<ul>
							{history.map((entry, i) => (
								<li key={i}>
									{entry.date} — {entry.score} из {entry.total}
								</li>
							))}
						</ul>
						<button
							onClick={() => {
								localStorage.removeItem('quizHistory')
								setHistory([])
							}}
						>
							Очистить историю
						</button>
					</div>
				)}
				{showResult ? (
					<Result
						score={score}
						total={shuffledQuestions.length}
						onRestart={restartQuiz}
					/>
				) : (
					<Question
						data={shuffledQuestions[current]}
						index={current}
						onAnswer={handleAnswer}
						total={shuffledQuestions.length}
					/>
				)}
			</div>
		</>
	)
}

export default App
