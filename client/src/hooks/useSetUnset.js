import { useEffect, useRef } from 'react';

export function useSetUnset(value, unsetValue, ref = undefined) {
  const nRef = useRef();
  ref = ref || nRef;

  useEffect(() => {
    ref.current = value;
    return () => {
      ref.current = unsetValue;
    };
  });

  return ref;
}
