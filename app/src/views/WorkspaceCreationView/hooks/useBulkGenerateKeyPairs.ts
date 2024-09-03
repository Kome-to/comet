import { generateRSAKeyPair } from '@/common/utils/crypto';
import { KeyPair } from '@/services/types/common';
import { useCallback, useEffect, useState } from 'react';

export const useBulkGenerateKeyPairs = (amount: number) => {
  const [keyPairs, setKeyPairs] = useState<KeyPair[]>([]);

  const generate = useCallback(async (amount: number) => {
    const data = await Promise.all(
      Array(amount)
        .fill(null)
        .map((_) => generateRSAKeyPair()),
    );
    setKeyPairs(data);
  }, []);

  useEffect(() => {
    generate(amount);
  }, [amount]);

  return { keyPairs };
};
