import { routes } from '@/common/utils/routes';
import { storage } from '@/common/utils/storage';
import HomeIcon from '@mui/icons-material/Home';
import MessageIcon from '@mui/icons-material/Message';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Avatar from '../Avatar/Avatar';
import PopupMenu from '../PopupMenu/PopupMenu';

const SideBarButtons = [
  { name: 'Home', Icon: HomeIcon, route: routes.DEFAULT },
  { name: 'DMs', Icon: MessageIcon, route: routes.DMS },
  { name: 'Activity', Icon: NotificationsNoneIcon, route: routes.ACTIVITY },
  { name: 'More', Icon: MoreHorizIcon },
];

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isCreateWorkspace = pathname === routes.DEFAULT;

  return (
    <div className="w-[70px] h-full flex flex-col justify-between items-center pb-5">
      <div className="w-full flex-1 flex flex-col justify-start items-center gap-4">
        {!isCreateWorkspace && (
          <>
            <div className="mt-2 mb-3">
              <Avatar className="size-9" name="Kometo" />
            </div>
            {SideBarButtons.map(({ Icon, name, route }) => (
              <div key={name}>
                <div
                  className={`size-9  ${pathname === route && 'bg-ex-surf/40'} rounded-md cursor-pointer hover:bg-ex-surf/40 overflow-hidden`}
                  onClick={() => !!route && navigate(route)}
                >
                  <div className="size-full flex justify-center items-center hover:scale-110">
                    <Icon htmlColor="#fff" />
                  </div>
                </div>
                <div className="text-white text-[10px] font-bold w-full text-center select-none">{name}</div>
              </div>
            ))}
          </>
        )}
      </div>
      <PopupMenu targetElement={<Avatar className="size-10" name="Kometo" />}>
        <div className="bg-ex-bg-1 pt-5 pb-3 text-ex-text-primary -translate-y-9">
          <div className="flex items-center gap-3 px-6">
            <Avatar className="size-9" name={'Kometo'} />
            <div>
              <div className="font-bold">Chu Duc Anh</div>
              <div className="flex items-center gap-2">
                <div className="bg-ex-active rounded-[50%] size-2"></div>
                <div className="text-sm text-ex-text-1">Active</div>
              </div>
            </div>
          </div>
          <div className="w-full h-[1px] bg-ex-grey-50 my-2"></div>
          <div
            className="px-6 font-medium hover:bg-[#036696] cursor-pointer py-1.5"
            onClick={() => {
              storage.removeToken();
              navigate(routes.SIGN_IN);
            }}
          >
            {t('sideBar.text.signOutOf', { name: 'Chu Duc Anh' })}
          </div>
        </div>
      </PopupMenu>
    </div>
  );
};

export default SideBar;
