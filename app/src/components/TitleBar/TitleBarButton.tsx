import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import classNames from 'classnames';
import React from 'react';

interface TitleBarButtonProps {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  className?: string;
  iconColor?: string;
  size?: 'small' | 'medium' | 'large';
  danger?: boolean;
  flip?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const TitleBarButton: React.FC<TitleBarButtonProps> = ({ icon: Icon, className = '', iconColor = '#fff', danger, onClick, flip }) => {
  const classes = classNames(
    'window-no-draggable flex items-center title-bar-button h-full px-4 hover:bg-ex-grey-50 cursor-pointer',
    className,
    {
      'hover:bg-rose-700': danger,
      'scale-x-[-1]': flip,
    },
  );

  return (
    <div onClick={onClick} className={classes}>
      {<Icon htmlColor={iconColor} fontSize="inherit" />}
    </div>
  );
};

export default TitleBarButton;
