import Tippy from '@tippyjs/react';
import React, { JSXElementConstructor, ReactElement } from 'react';

interface PopupMenuProps {
  children: React.ReactNode;
  targetElement: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ children, targetElement }) => {
  return (
    <Tippy duration={[250, 200]} interactive animation="scale" hideOnClick trigger="click" placement="right-start" content={children}>
      <button>{targetElement}</button>
    </Tippy>
  );
};

export default PopupMenu;
