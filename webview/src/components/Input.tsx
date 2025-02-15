import { useEffect, useState } from 'react'

const Input = ({ onSend }: { onSend: (text: string) => void }) => {
	const [text, setText] = useState('')
	const [vscode, setVscode] = useState(null)

	// const vscode = window.acquireVsCodeApi ? window.acquireVsCodeApi() : null

	useEffect(() => {
		setVscode(window.acquireVsCodeApi())
		console.log(vscode)
	}, [])

	const sendMessage = () => {
		if (vscode !== null) {
			vscode.postMessage({ command: 'sendMessage', text })
		}
		setText('')
		onSend(text)
	}

	return (
		<div className="mt-4 flex text-black space-x-2">
			<textarea
				value={text}
				onChange={(e) => setText(e.target.value)}
				className="flex-1 p-2 border rounded"
				placeholder="Type a message..."
			/>
			<button
				onClick={sendMessage}
				className="bg-blue-500 text-red px-4 py-2 rounded hover:bg-blue-700 transition"
			>
				Send
			</button>
		</div>
	)
}

export default Input
