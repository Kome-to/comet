import { useState } from 'react';

export const useResizeLeftBar = (initWidth = 240, negative: boolean = false) => {
  const [width, setWidth] = useState(initWidth);

  const drag = (diff: number) => {
    const newWidth = negative ? width + diff : width - diff;

    if (Math.abs(diff) > 300) return;

    if (newWidth < 200) return setWidth(200);

    if (newWidth > 600) return setWidth(600);

    setWidth(newWidth);
  };

  return { width, drag };
};
