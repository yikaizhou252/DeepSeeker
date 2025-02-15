import ReactMarkdown from 'react-markdown'

const Chat = ({message, isUser}: {message: string; isUser: boolean}) => {
	if (message === '') return null
	return (
		<ReactMarkdown
			className={`p-2 rounded-lg max-w-[75%] ${
				isUser ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'
			}`}
		>
			{message}
		</ReactMarkdown>
	)
}

// text-gray-700 p-2 bg-gray-200 rounded
export default Chat
