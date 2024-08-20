import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import icp from '../../services/ipc/icp';
import Icon, { IconName } from '../Icon/Icon';
import TitleBarButton from './TitleBarButton';
import { useMaximizeWindowListener } from './useMaximizeWindowListener';
import { useLocation } from 'react-router-dom';
import { routes } from '@/common/utils/routes';
import classNames from 'classnames';

const TitleBar: React.FC<{ auth?: boolean }> = ({ auth }) => {
  const { t } = useTranslation();
  const { isMaximized } = useMaximizeWindowListener();
  const { pathname } = useLocation();

  const onCloseApp = () => icp.invoker.closeApp();
  const onMinimizeApp = () => icp.invoker.minimizeApp();
  const onMaximizeApp = () => icp.invoker.maximizeApp();

  const subText = useMemo(() => {
    switch (pathname) {
      case routes.SIGN_IN:
        return 'titleBar.text.subTitle.signIn';
      default:
        return '';
    }
  }, [pathname]);

  const titleBarClasses = classNames('window-draggable fixed top-0 left-0 w-screen h-8 flex justify-between items-center', {
    'bg-ex-grey': !auth,
    'bg-transparent h-[40px]': auth,
  });

  return (
    <div className={titleBarClasses}>
      <div className="h-full flex text-white items-center">
        {/* TODO: Create Menu function*/}
        <TitleBarButton className={`${auth && 'w-[70px]'} flex justify-center`} icon={MenuIcon} />
        {!auth && (
          <div className="flex items-center gap-2">
            <Icon className="size-4" name={IconName.LOGO_S} />
            {subText ? (
              <>
                <div className="ml-1 text-sm select-none">{t(subText)}</div>
                <div className="h-3 w-[1px] bg-white" />
              </>
            ) : null}

            <div className="text-sm select-none">{t('common.text.brand')}</div>
          </div>
        )}
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
