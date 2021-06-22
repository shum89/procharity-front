import { useState } from 'react';

// хук для того чтобы использовать стейт синхронно
const useSyncState = <T,>(
  initialState: T
): [() => T, (newState: T) => void] => {
  const [state, updateState] = useState(initialState);
  let current = state;
  const get = (): T => current;
  const set = (newState: T) => {
    current = newState;
    updateState(newState);
    return current;
  };
  return [get, set];
};

export default useSyncState;
