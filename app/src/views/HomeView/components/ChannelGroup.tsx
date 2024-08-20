import React, { useState } from 'react';
import DropGroup, { DropGroupItemData } from '../../../components/DropGroup/DropGroup';
import Channel from './Channel';

const ChannelGroup: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('');

  const channels = [
    { id: 'channel-1', label: 'random' },
    { id: 'channel-2', label: 'general' },
    { id: 'channel-3', label: 'technology' },
  ];
  const directMessages = [
    { id: 'dm-1', label: 'Duc Anh' },
    { id: 'dm-2', label: 'Akuin Master' },
    { id: 'dm-3', label: 'Kometo' },
  ];

  const handleClickChannel = (item: DropGroupItemData) => {
    setActiveChannel(item.id);
  };

  return (
    <div className="text-[#aeddec]/80 pt-4">
      <DropGroup
        onClickItem={handleClickChannel}
        activeItem={activeChannel}
        label={'Channels'}
        data={channels}
        renderItem={(item) => <Channel active={activeChannel === item.id} label={item.label} />}
      />
      <DropGroup
        activeItem={activeChannel}
        onClickItem={handleClickChannel}
        label={'Direct messages'}
        data={directMessages}
        renderItem={(item) => <Channel directMessage active={activeChannel === item.id} label={item.label} />}
      />
    </div>
  );
};

export default ChannelGroup;
