import classNames from 'classnames';
import React from 'react';
import Icon, { IconName } from '../Icon/Icon';

interface LogoProps {
  className?: string;
  wrapperClassName?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Logo: React.FC<LogoProps> = ({ className, onClick, wrapperClassName }) => {
  const wrapperClasses = classNames('size-max cursor-pointer', wrapperClassName);
  const classes = classNames('logo', className);

  return (
    <div onClick={onClick} className={wrapperClasses}>
      <Icon className={classes} name={IconName.LOGO} />
    </div>
  );
};

export default Logo;
