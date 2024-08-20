import React from 'react';
import ChatHeader from './ChatHeader';
import ChatContent from '../ChatContent/ChatContent';

interface ChatBoardProps {
  directMessage?: boolean;
}

const ChatBoard: React.FC<ChatBoardProps> = ({ directMessage }) => {
  return (
    <div className="flex-1 bg-[#1a1d21] flex flex-col">
      <ChatHeader />
      <ChatContent />
    </div>
  );
};

export default ChatBoard;
