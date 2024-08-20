import useDrag from '@/common/hooks/useDrag';
import classNames from 'classnames';
import React from 'react';

interface DragHandlerProps {
  className?: string;
  drag: (diff: number) => void;
}

const DragHandler: React.FC<DragHandlerProps> = ({ className, drag }) => {
  const { dragStart, dragStop, dragMove } = useDrag();

  const classes = classNames(className);

  return (
    <div
      onDrag={(e) => dragMove(e, drag)}
      onDragStart={(e: React.DragEvent) => {
        const img = new Image();
        img.src = '';
        e.dataTransfer.setDragImage(img, 0, 0);
        dragStart(e);
      }}
      onDragEnd={dragStop}
      draggable
      className={classes}
    >
      <div className="absolute top-0 bottom-0 w-2 px-[2px] left-[-50%] translate-x-[-50%] hover:delay-200 opacity-0 hover:opacity-100">
        <div className="size-full bg-[#1264A3]"></div>
      </div>
    </div>
  );
};

export default DragHandler;
