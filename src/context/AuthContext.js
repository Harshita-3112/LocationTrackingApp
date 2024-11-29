import {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleAuthStateChanged = person => {
    console.log('person', person);

    setUser(person);
    setLoading(false);
  };

  useEffect(() => {
    const listener = auth().onAuthStateChanged(handleAuthStateChanged);
    return listener;
  }, []);

  return (
    <AuthContext.Provider value={{user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};
