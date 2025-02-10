import {useEffect, useState} from 'react'
import Chat from './components/Chat'
import Input from './components/Input'

const App = () => {
	const [message, setMessage] = useState('')
	const [sessionMessages, setSessionMessages] = useState<string[]>([])

	const handleSend = (newMessage: string) => {
		setSessionMessages((prevMessages) => [...prevMessages, newMessage]) // Append message
	}

	useEffect(() => {
		window.addEventListener('message', (event) => {
			const {command, text} = event.data
			if (command === 'chatResponse') {
				// update the output by chunks
				setMessage(text)
			} else if (command === 'chatEnd') {
				// update session by pushing latest chatbot message
				console.log('chatEnd event received')
				console.log('session rn', sessionMessages)
        setMessage('')
				setSessionMessages((prevMessages) => [...prevMessages, text])
			}
		})
	}, [])

	return (
		<div className="flex flex-col p-4 bg-gray-100 h-screen justify-between">
			<h2 className="text-lg font-bold text-black mb-2">Deepseeker Chat</h2>
			<div className="flex flex-col flex-1 space-y-2 p-4 border border-gray-300 rounded bg-white overflow-auto">
				{sessionMessages.map((msg, idx) => (
					<Chat key={idx} message={msg} />
				))}
        <Chat message={message} />
			</div>
			<Input onSend={handleSend} />
		</div>
	)
}

export default App
