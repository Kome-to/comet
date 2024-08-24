import { isString } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export const useDynamicSvgImport = (iconName: string) => {
  const importedIconRef = useRef<React.FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(true);
    const importSvgIcon = async (): Promise<void> => {
      try {
        if (isString(iconName)) {
          importedIconRef.current = (await import(`../svg/${iconName}.svg?react`)).default;
        }
      } catch (err) {
        setError(err);
        console.error(iconName, err);
      } finally {
        setLoading(false);
      }
    };

    importSvgIcon();
  }, [iconName]);

  return { error, loading, SvgIcon: importedIconRef.current };
};
