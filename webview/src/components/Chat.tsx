const Chat = ({message}: {message: string}) => {
	return (
		<div className="flex flex-col space-y-2 p-4 border border-gray-300 rounded bg-white h-64 overflow-auto">
			<p className="text-gray-700 p-2 bg-gray-200 rounded">{message}</p>
		</div>
	)
}

export default Chat
