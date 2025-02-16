import { useEffect, useState } from 'react'
import Chat from './components/Chat'
import Input from './components/Input'
import { Message } from './interfaces/Message'
import ShikiHighlighter, { type Element } from 'react-shiki'

const App = () => {
	const [printerMessage, setPrinterMessage] = useState('')
	const [sessionMessages, setSessionMessages] = useState<Message[]>([])
	const [vscode, setVscode] = useState(null)

	const handleSend = (newMessage: string) => {
		setSessionMessages((prevMessages) => {
			const messages = [...prevMessages, { content: newMessage, role: 'user' }]
			if (vscode !== null) {
				vscode.postMessage({ command: 'sendMessage', messages })
			}
			return messages
		})

		// console.log('Session messages in react: ', sessionMessages)

		// if (vscode !== null) {
		// 	console.log('Debug: sending dict to vscode', sessionMessages)
		// 	vscode.postMessage({ command: 'sendMessage', sessionMessages })
		// }
	}

	// TODO
	//https://react-shiki.vercel.app/ maybe use this

	useEffect(() => {
		setVscode(window.acquireVsCodeApi())
		console.debug('Debug: acquired vscode api', vscode)
		window.addEventListener('message', (event) => {
			const { command, text } = event.data
			if (command === 'chatResponse') {
				// update the output by chunks
				setPrinterMessage(text)
			} else if (command === 'chatEnd') {
				setPrinterMessage('')
				setSessionMessages((prevMessages) => [...prevMessages, { content: text, role: 'assisstant' }])
			}
		})
	}, [])

	return (
		<div className="flex flex-col p-4 bg-gray-100 h-screen justify-between">
			<h2 className="text-lg font-bold text-black mb-2 self-center">Deepseeker Chat</h2>
			<div className="flex flex-col flex-1 space-y-2 p-4 border border-gray-300 rounded bg-white overflow-auto">
				{/* <SyntaxHighlighter language="python" style={dark}>
					import os print("Hello, bad World!")
				</SyntaxHighlighter> */}

				{/* previous conversations */}
				{sessionMessages.map((msg: Message, idx) => (
					<Chat key={idx} message={msg.content} role={msg.role} />
				))}

				{/* bot message that's currently loading in chunks */}
				<Chat message={printerMessage} role={'assisstant'} />
				{/* <Chat message={"yoooo this is crazy python code```print('hello')```"} role={'assisstant'} /> */}
				<ShikiHighlighter
					language="python"
					theme="houston"
					showLanguage={false}
					addDefaultStyles={true}
					as="div"
					style={{
						textAlign: 'left',
					}}
				>
					{`import os \n\tprint('hello')`}
				</ShikiHighlighter>
			</div>
			<Input onSend={handleSend} />
		</div>
	)
}

export default App
