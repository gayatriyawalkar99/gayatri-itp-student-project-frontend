import React, { createContext, useContext, useState } from 'react';
 
const AuthContext = createContext(null);
 
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
 
  function login(userData) {
    // Do not store the password in the current session.
    const safeUser = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      role: userData.role
    };
    sessionStorage.setItem('currentUser', JSON.stringify(safeUser));
    setUser(safeUser);
  }
 
  function logout() {
    sessionStorage.removeItem('currentUser');
    setUser(null);
  }
 
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  return useContext(AuthContext);
}
