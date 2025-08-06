'use client';

import { useCallback } from 'react';

interface TokenData {
  accessToken: string;
}

export const useTokenStorage = () => {
  const setTokens = useCallback(
    (tokens: TokenData) => {
        localStorage.setItem('accessToken', tokens.accessToken);
      console.log('Tokens stored successfully');
    },
    []
  );

  const getTokens = useCallback((): TokenData | null => {
    const localToken = localStorage.getItem('accessToken');
    if (localToken) {
      return {
        accessToken: localToken,
      };
    }
    return null;
  }, []);

  const clearTokens = useCallback(() => {
    localStorage.removeItem('accessToken');
    console.log('All tokens cleared successfully');
  }, []);

  const hasTokens = useCallback((): boolean => {
    return getTokens() !== null;
  }, [getTokens]);



  return {
    setTokens,
    getTokens,
    clearTokens,
    hasTokens,
  };

};
