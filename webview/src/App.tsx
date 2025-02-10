import { useEffect, useState } from 'react';
import Chat from './components/Chat';
import Input from './components/Input';

const App = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const { command, text } = event.data;
      if (command === 'chatResponse') {
        setMessage(text);
      }
    });
  }, []);

  return (
    <div className="flex flex-col p-4 bg-gray-100 h-screen">
      <h2 className="text-lg font-bold text-black mb-2">Deepseeker Chat</h2>
      <Chat message={message} />
      <Input />
    </div>
  );
};

export default App;