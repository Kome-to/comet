import ChatEditor from '@/components/ChatEditor/ChatEditor';
import React from 'react';
import MessageList from './MessageList';

const ChatContent: React.FC = () => {
  return (
    <div className="w-full flex-1  flex min-h-0">
      <div className="flex-1 flex flex-col">
        <MessageList className="flex flex-col-reverse flex-1 overflow-auto" />
        <ChatEditor className="mx-2 my-2" />
      </div>
    </div>
  );
};

export default ChatContent;
