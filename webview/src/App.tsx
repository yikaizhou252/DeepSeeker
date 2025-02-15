import { useEffect, useState } from 'react'
import Chat from './components/Chat'
import Input from './components/Input'
import { Message } from './interfaces/Message'

const App = () => {
	const [printerMessage, setPrinterMessage] = useState('')
	const [sessionMessages, setSessionMessages] = useState<Message[]>([])

	const handleSend = (newMessage: string) => {
		setSessionMessages((prevMessages) => [...prevMessages, { text: newMessage, isUser: true }]) // Append message
	}

	// const testCode = () => (
	// 	<SyntaxHighlighter language="python" style={dark}>
	// 		import os print("Hello, World!")
	// 	</SyntaxHighlighter>
	// )

	// TODO
	//https://react-shiki.vercel.app/ maybe use this

	useEffect(() => {
		window.addEventListener('message', (event) => {
			const { command, text } = event.data
			if (command === 'chatResponse') {
				// update the output by chunks
				setPrinterMessage(text)
			} else if (command === 'chatEnd') {
				// update session by pushing latest chatbot message
				console.log('chatEnd event received')
				console.log('session rn', sessionMessages)
				setPrinterMessage('')
				setSessionMessages((prevMessages) => [...prevMessages, { text: text, isUser: false }])
			}
		})
	}, [])

	return (
		<div className="flex flex-col p-4 bg-gray-100 h-screen justify-between">
			<h2 className="text-lg font-bold text-black mb-2">Deepseeker Chat</h2>
			<div className="flex flex-col flex-1 space-y-2 p-4 border border-gray-300 rounded bg-white overflow-auto">
				{/* <SyntaxHighlighter language="python" style={dark}>
					import os print("Hello, bad World!")
				</SyntaxHighlighter> */}

				{/* previous conversations */}
				{sessionMessages.map((msg: Message, idx) => (
					<Chat key={idx} message={msg.text} isUser={msg.isUser} />
				))}

				{/* bot message that's currently loading in chunks */}
				<Chat message={printerMessage} isUser={false} />
			</div>
			<Input onSend={handleSend} />
		</div>
	)
}

export default App
