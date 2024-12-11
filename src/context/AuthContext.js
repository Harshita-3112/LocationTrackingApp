import {createContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLocalAuthState();
  });

  const checkLocalAuthState = async () => {
    try {
      const authData = await AsyncStorage.getItem('authData');
      console.log('authData', authData);

      if (authData) {
        setUser(true);
      } else {
        setUser(false);
      }
    } catch (error) {
      setUser(false);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifiedUser = async data => {
    try {
      console.log('data here', data);
      await AsyncStorage.setItem('token', JSON.stringify(data?.token));

      await AsyncStorage.setItem('authData', JSON.stringify(data));
      setUser(true);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authData');
      await AsyncStorage.clear();
      setUser(false);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{user, loading, handleVerifiedUser, handleLogout}}>
      {children}
    </AuthContext.Provider>
  );
};
