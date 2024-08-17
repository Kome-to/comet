import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';
import { useTranslation } from 'react-i18next';
import icp from '../../services/ipc/icp';
import Icon, { IconName } from '../Icon/Icon';
import TitleBarButton from './TitleBarButton';
import { useMaximizeWindowListener } from './useMaximizeWindowListener';

const TitleBar: React.FC = () => {
  const { t } = useTranslation();
  const { isMaximized } = useMaximizeWindowListener();

  const onCloseApp = () => icp.invoker.closeApp();
  const onMinimizeApp = () => icp.invoker.minimizeApp();
  const onMaximizeApp = () => icp.invoker.maximizeApp();

  return (
    <div className="window-draggable fixed top-0 left-0 w-screen h-8 bg-ex-grey flex justify-between items-center">
      <div className="h-full flex text-white items-center">
        {/* TODO: Create Menu */}
        {/* <TitleBarButton icon={MenuIcon} /> */}
        <div className="flex items-center gap-2 pl-4">
          <Icon className="size-4" name={IconName.LOGO_S} />
          <div className="text-sm select-none">{t('text.brand')}</div>
        </div>
      </div>
      <div className="h-full flex items-center">
        <TitleBarButton onClick={onMinimizeApp} icon={HorizontalRuleIcon} />
        <TitleBarButton flip onClick={onMaximizeApp} icon={isMaximized ? ContentCopyIcon : CropSquareIcon} />
        <TitleBarButton danger onClick={onCloseApp} icon={CloseIcon} />
      </div>
    </div>
  );
};

export default TitleBar;
