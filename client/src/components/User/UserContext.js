import React, { createContext, useState } from 'react';
import { STORAGE } from '../../constants/storageKeys';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem(STORAGE.ACCESS_TOKEN) || null
  );

  const storeToken = token => {
    setToken(token);
    localStorage.setItem(STORAGE.ACCESS_TOKEN, token);
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, storeToken }}>
      {children}
    </UserContext.Provider>
  );
}
