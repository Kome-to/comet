import classNames from 'classnames';
import React from 'react';
import ChannelGroup from './ChannelGroup';

interface LeftBarProps {
  className?: string;
  width?: number;
}

const LeftBar: React.FC<LeftBarProps> = ({ className = '', width = 240 }) => {
  const classes = classNames('flex flex-col', className);
  return (
    <div className={classes} style={{ width }}>
      <div className="w-full h-[50px] flex justify-between items-center px-4">
        <div className="text-lg text-white font-bold">Kometo</div>
        <div></div>
      </div>
      <div className="bg-[#e8e8e8]/20 w-full h-[1px]" />
      <ChannelGroup />
    </div>
  );
};

export default LeftBar;
