import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import React, { useState } from 'react';
import Avatar from '../Avatar/Avatar';

const SideBarButtons = [
  { name: 'Home', Icon: HomeIcon },
  { name: 'DMs', Icon: MessageIcon },
  { name: 'Activity', Icon: NotificationsNoneIcon },
  { name: 'More', Icon: MoreHorizIcon },
];

const SideBar: React.FC = () => {
  const [active, setActive] = useState('home');

  const onClick = (name: string) => {
    setActive(name);
  };

  return (
    <div className="w-[70px] h-full">
      <div className="w-full h-full flex flex-col justify-start items-center gap-4">
        <div className="mt-2 mb-3">
          <Avatar className='size-9' name="Kometo" />
        </div>
        {SideBarButtons.map(({ Icon, name }) => (
          <div key={name}>
            <div
              className={`size-9  ${active === name && 'bg-ex-surf/40'} rounded-md cursor-pointer hover:bg-ex-surf/40 overflow-hidden`}
              onClick={() => onClick(name)}
            >
              <div className="size-full flex justify-center items-center hover:scale-110">
                <Icon htmlColor="#fff" />
              </div>
            </div>
            <div className='text-white text-[10px] font-bold w-full text-center select-none'>{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
