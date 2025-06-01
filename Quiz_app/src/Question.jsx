import { useEffect, useState } from 'react'

export default function Question({ data, index, onAnswer, total }) {
	const [selected, setSelected] = useState(null)
	const [shuffledOptions, setShuffledOptions] = useState([])

	const handleClick = option => {
		if (selected) return
		setSelected(option)

		setTimeout(() => {
			onAnswer(option)
		}, 1000)
	}

	useEffect(() => {
		setSelected(null)
	}, [data])

	useEffect(() => {
		const shuffled = [...data.options].sort(() => Math.random() - 0.5)
		setShuffledOptions(shuffled)
	}, [data])

	return (
		<div className='question'>
			<h2>
				Вопрос {index + 1} из {total}
			</h2>
			<p>{data.question}</p>
			<div className='options'>
				{shuffledOptions.map((option, i) => {
					let className = 'option'
					if (selected) {
						if (option === data.answer) className += ' correct'
						else if (option === selected) className += ' incorrect'
					}

					return (
						<button
							key={i}
							onClick={() => handleClick(option)}
							className={className}
							disabled={!!selected}
						>
							{option}
						</button>
					)
				})}
			</div>
		</div>
	)
}
