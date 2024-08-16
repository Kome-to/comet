import classNames from 'classnames';
import React from 'react';
import Svg, { SvgName } from '../Svg/Svg';

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
      <Svg className={classes} name={SvgName.LOGO} />
    </div>
  );
};

export default Logo;
