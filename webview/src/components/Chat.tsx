import React from "react"
import ReactMarkdown from "react-markdown"

const Chat = ({message}: {message: string}) => {
	return (
		<div className="flex flex-col space-y-2 p-4 border border-gray-300 rounded bg-white h-64 overflow-auto">
			<ReactMarkdown className="text-gray-700 p-2 bg-gray-200 rounded">{message}</ReactMarkdown>
		</div>
	)
}

export default Chat
