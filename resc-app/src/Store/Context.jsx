import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [verifiedbtn, setVerifiedBtnVisible] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        verifiedbtn,
        setVerifiedBtnVisible
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
