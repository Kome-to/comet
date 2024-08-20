import React from 'react';
import ChatBoard from './components/ChatBoard/ChatBoard';
import DragHandler from './components/DragHandler';
import LeftBar from './components/LeftBar';
import Thread from './components/Thread';
import { useResizeLeftBar } from './hooks/useResizeLeftBar';

const INIT_LEFT_BAR_WIDTH = 280;

const HomeView: React.FC = () => {
  const { width: leftBarWidth, drag: dragLeftBar } = useResizeLeftBar(INIT_LEFT_BAR_WIDTH);
  const { width: threadWidth, drag: dragThread } = useResizeLeftBar(INIT_LEFT_BAR_WIDTH, true);

  return (
    <div className="flex-1 pb-[4px] pr-[4px]" onDragOver={(e) => e.preventDefault()}>
      <div className="bg-[#101214]/60 size-full rounded-md overflow-hidden border-solid border-white/10 border-[1px] flex relative">
        <LeftBar width={leftBarWidth} />
        <DragHandler drag={dragLeftBar} className="relative w-0.5 bg-primary cursor-ew-resize" />
        <ChatBoard />
        <DragHandler drag={dragThread} className="relative w-[1px] bg-ex-grey-50 cursor-ew-resize" />
        <Thread width={threadWidth} />
      </div>
    </div>
  );
};

export default HomeView;
