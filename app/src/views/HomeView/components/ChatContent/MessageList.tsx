import MessageBlock from '@/components/MessageBlock/MessageBlock';
import classNames from 'classnames';
import React from 'react';

interface MessageListProps {
  className?: string;
}

const MessageList: React.FC<MessageListProps> = ({ className }) => {
  const classes = classNames('', className);

  return (
    <div className={classes}>
      <MessageBlock />
      <MessageBlock />
      {/* <MessageBlock />
      <MessageBlock />
      <MessageBlock /> */}
    </div>
  );
};

export default MessageList;
