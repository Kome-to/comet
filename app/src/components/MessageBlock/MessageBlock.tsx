import Avatar from '@/components/Avatar/Avatar';
import React from 'react';

interface MessageBlockProps {}

const MessageBlock: React.FC<MessageBlockProps> = ({}) => {
  return (
    <div className="flex gap-2 hover:bg-ex-bg-1 px-4 py-2 select-text">
      <Avatar className="h-9 w-[36px]" name="Kometo" />
      <div className="flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <div className="text-[#f8f8f8] font-bold select-text">Chu Duc Anh</div>
          <div className="text-ex-text-1 text-xs">9:35 PM</div>
        </div>
        <div className="text-ex-text-1 font-normal select-text">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus beatae modi esse deserunt molestiae qui, nobis facilis placeat
          corporis inventore repellat sequi dolor velit vero quis nesciunt quos similique! Voluptatum.
        </div>
      </div>
    </div>
  );
};

export default MessageBlock;
