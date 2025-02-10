import ReactMarkdown from 'react-markdown'

const Chat = ({message}: {message: string}) => {

  if(message === '') return null
	return <ReactMarkdown className="text-gray-700 p-2 bg-gray-200 rounded">{message}</ReactMarkdown>
}

export default Chat
