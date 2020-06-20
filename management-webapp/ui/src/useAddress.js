import { useEffect } from 'react';

import { ADDRESS } from './address';

export function useAddressKeys() {
  return Object.keys(ADDRESS);
}

export function useAddressValues() {
  return Object.values(ADDRESS);
}

export function useAddressLevel1ValueList() {
  const keys = useAddressKeys();
  const values = useAddressValues();
  const arr = [];

  useEffect(() => {
    keys.forEach((e, index) => {
      if (e.slice(-4) === '0000') {
        arr.push(values[index]);
      }
    });
  }, []);

  return arr;
}
