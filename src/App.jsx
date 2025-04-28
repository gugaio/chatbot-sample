import { useRef } from 'react'
import './App.css'
import AgentService from './services/AgentService';
import {AgentChat} from 'ajent-chatbot';
import 'ajent-chatbot/styles';
import {Audio} from 'ajent';


function App() {
  
  const API_TOKEN = import.meta.env.VITE_AJENT_API_TOKEN;
  if (!API_TOKEN) {
    throw new Error('API token is not defined. Please set the VITE_AJENT_API_TOKEN environment variable.');
  }
  const agentService = useRef(new AgentService(API_TOKEN));

  const onUserTextMessage = async (message) => {
    return agentService.current.send(message)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl h-[600px] shadow-lg rounded-lg overflow-hidden">
        <AgentChat  onUserTextMessage={onUserTextMessage} title='Chatbot' welcomeMessage='Olá, como posso ajudar?' inputPlaceholder='Digite sua mensagem...' transcribingMessage='Transcrevendo áudio...' audio={new Audio(API_TOKEN)} />
      </div>
    </div>
  );
}

export default App;


