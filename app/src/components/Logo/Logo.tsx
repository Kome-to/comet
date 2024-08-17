import classNames from 'classnames';
import React from 'react';
import Icon, { IconName } from '../Icon/Icon';
import styled from 'styled-components';

interface LogoProps {
  className?: string;
  wrapperClassName?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  textColor?: string;
}

const Logo: React.FC<LogoProps> = ({ className, onClick, wrapperClassName, textColor = '#000' }) => {
  const wrapperClasses = classNames('size-max cursor-pointer', wrapperClassName);
  const classes = classNames('logo', className);

  const LogoWrapper = styled.div`
    svg {
      #SvgjsG1154 {
        fill: ${textColor};
      }
    }
  `;

  return (
    <LogoWrapper onClick={onClick} className={wrapperClasses}>
      <Icon className={classes} name={IconName.LOGO} />
    </LogoWrapper>
  );
};

export default Logo;
