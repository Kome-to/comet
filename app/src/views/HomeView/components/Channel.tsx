import React from 'react';
import { useTranslation } from 'react-i18next';

import Icon, { IconName } from '@/components/Icon/Icon';
import Avatar from '@/components/Avatar/Avatar';

interface ChannelProps {
  label?: string;
  directMessage?: boolean;
  active?: boolean;
}

const Channel: React.FC<ChannelProps> = ({ label = '', directMessage = false, active = false }) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex items-center gap-3 text-[15px]  ${active ? 'bg-[#036696]  text-ex-surf font-medium ' : 'hover:bg-ex-surf/10'} cursor-pointer py-1 pl-5 mx-2 rounded-md`}
    >
      {directMessage ? <Avatar className='size-7 text-white text-xs' name={label} /> : <Icon className="w-4 h-4" name={IconName.CHANNEL_PREFIX} />}
      <div>{t(label)}</div>
    </div>
  );
};

export default Channel;
