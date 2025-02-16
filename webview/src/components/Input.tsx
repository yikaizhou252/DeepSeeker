import { useEffect, useState } from 'react'

const Input = ({ onSend }: { onSend: (text: string) => void }) => {
	const [text, setText] = useState('')
	const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

	// const vscode = window.acquireVsCodeApi ? window.acquireVsCodeApi() : null
	useEffect(() => {
		window.addEventListener('message', (event) => {
			const { command } = event.data
			if (command === 'chatEnd') {
				// update session by pushing latest chatbot message
				console.debug('Debug: chatEnd event received')
				setIsSubmitDisabled(false)
			}
		})		
	}, [])

	useEffect(() => {
		setIsSubmitDisabled(text === '') 
	}, [text])

	const sendMessage = () => {
		setIsSubmitDisabled(true)
		onSend(text)
		setText('')
	}

	return (
		<form className="mt-4 flex text-black space-x-2" action={sendMessage}>
			<input
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="flex-1 p-2 border rounded"
				placeholder="Type a message..."
			/>
			<button
				type="submit"
				disabled={isSubmitDisabled}
				className={`px-4 py-2 rounded text-white ${
					isSubmitDisabled ? 'bg-gray-400 !cursor-not-allowed' : 'bg-sky-500 hover:bg-blue-700'
				} transition`}
			>
				Send
			</button>
		</form>
	)
}

export default Input
