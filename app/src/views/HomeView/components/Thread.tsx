import React from 'react';
import MessageList from './ChatContent/MessageList';
import ChatEditor from '@/components/ChatEditor/ChatEditor';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ThreadProps {
  width: number;
}

const Thread: React.FC<ThreadProps> = ({ width }) => {
  return (
    <div className="flex flex-col bg-[#1a1d21]" style={{ width }}>
      <div className="h-12 mb-4 px-3 flex justify-between items-center">
        <div className="text-ex-text-primary text-lg font-bold">Thread</div>
        <div className="cursor-pointer text-2xl hover:bg-ex-text-1/30 flex items-center justify-center p-1.5 rounded-lg">
          <CloseIcon fontSize="inherit" htmlColor="#d1d2d3"/>
        </div>
      </div>
      <div className="flex flex-col-reverse overflow-auto flex-1 min-h-0">
        <MessageList className="" />
      </div>
      <ChatEditor className="mx-2 my-2 max-h-80" />
    </div>
  );
};

export default Thread;
