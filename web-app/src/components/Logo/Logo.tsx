import classNames from 'classnames';
import React from 'react';
import Svg, { SvgName } from '../Svg/Svg';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  const classes = classNames('logo', className);

  return (
    <div className="size-max">
      <Svg className={classes} name={SvgName.LOGO} />
    </div>
  );
};

export default Logo;
