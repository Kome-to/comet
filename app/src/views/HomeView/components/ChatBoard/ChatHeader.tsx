import Avatar from '@/components/Avatar/Avatar';
import React from 'react';

const ChatHeader: React.FC = () => {
  return (
    <div className="h-16 border-b-[1px] border-solid border-ex-grey-50">
      <div className="flex gap-4 items-center h-full pl-4">
        <Avatar className='size-9' name={'Duc Anh'} />
        <span className="text-lg text-[#d1d2d3] font-bold">Duc Anh</span>
      </div>
    </div>
  );
};

export default ChatHeader;
