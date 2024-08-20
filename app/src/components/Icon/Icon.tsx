import styled from '@emotion/styled';
import classNames from 'classnames';
import React from 'react';
import { useDynamicSvgImport } from './hooks/useDynamicSvgImport';

export enum IconName {
  LOGO = 'logo',
  LOGO_S = 'logo-s',
  INFO = 'info',
  CLOSE = 'close',
  MENU = 'menu',
  MAXIMIZE = 'maximize',
  MINIMIZE = 'minimize',
  CHANNEL_PREFIX = 'channel-prefix',
  TYPE_BOLD = 'type-bold',
}

interface IconProps {
  className?: string;
  name: string;
  style?: React.CSSProperties;
  colorCss?: string;
}

const Icon: React.FC<IconProps> = ({ name, style = {}, className = '', colorCss }) => {
  const { loading, SvgIcon } = useDynamicSvgImport(name);

  const classes = classNames('icon', className);

  const SvgContainer = colorCss
    ? styled.div`
        svg {
          #${'css-main-color'} {
            ${colorCss};
          }
        }
      `
    : ({ children }: { children: React.ReactNode }) => children;

  return !loading && SvgIcon ? (
    <SvgContainer>
      <SvgIcon className={classes} style={style} />
    </SvgContainer>
  ) : null;
};

export default Icon;
