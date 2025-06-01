export default function Result({ score, total, onRestart }) {
	const percent = Math.round((score / total) * 100)

	return (
		<div className='result'>
			<h2>Тест завершён!</h2>
			<p>
				Ты ответил правильно на {score} из {total} вопросов
			</p>
			<p>Результат: {percent}%</p>
			<button onClick={onRestart}>Пройти заново</button>
		</div>
	)
}
