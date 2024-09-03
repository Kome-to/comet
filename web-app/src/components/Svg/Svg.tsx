import classNames from 'classnames';
import React from 'react';
import { useDynamicSvgImport } from './hooks/useDynamicSvgImport';

export enum SvgName {
  LOGO = 'logo',
  INFO = 'info',
  GET_STATED_WORKSPACE = 'get-started-workspaces',
}

interface SvgProps {
  className?: string;
  name: string;
  style?: React.CSSProperties;
}

const Svg: React.FC<SvgProps> = ({ name, style = {}, className = '' }) => {
  const { loading, SvgIcon } = useDynamicSvgImport(name);

  const classes = classNames('icon', className);

  return !loading && SvgIcon ? <SvgIcon className={classes} style={style} /> : null;
};

export default Svg;
