import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import React, { useEffect, useState } from 'react';

declare type DropGroupItemId = string;

export interface DropGroupItemData {
  id: DropGroupItemId;
  label?: string;
  isActive?: boolean;
}

interface DropGroupProps {
  label?: string;
  open?: boolean;
  onExpand?: () => void;
  activeItem?: DropGroupItemId;
  data?: DropGroupItemData[];
  renderItem?: (item: DropGroupItemData) => React.ReactNode;
  onClickItem?: (item: DropGroupItemData) => void;
}

const DropGroup: React.FC<DropGroupProps> = ({
  label,
  open,
  onExpand,
  data = [],
  renderItem = null,
  activeItem,
  onClickItem = (_) => {},
}) => {
  const [isExpand, setIsExpand] = useState(open);

  useEffect(() => {
    setIsExpand(open);
  }, [open]);

  const handleExpand = () => {
    setIsExpand(!isExpand);
    if (onExpand) {
      onExpand();
    }
  };

  return (
    <div className="pt-4 w-full">
      <div className="flex items-center cursor-pointer gap-1 pl-4 pb-1">
        <div onClick={handleExpand} className="hover:bg-ex-surf/10 p-1.5 rounded-sm flex justify-center items-center">
          <ArrowForwardIosIcon className={`!text-sm ${isExpand && 'rotate-90'}`} />
        </div>
        <span className="font-bold">{label}</span>
      </div>
      <div className="w-full">
        {!!renderItem &&
          data.map((item, i) => {
            const isActive = activeItem === item.id;
            if (!isExpand && !isActive) return;
            return (
              <div className="mt-1" onClick={() => onClickItem(item)} key={`${item.label}.${i}`}>
                {renderItem({ ...item, isActive })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DropGroup;
