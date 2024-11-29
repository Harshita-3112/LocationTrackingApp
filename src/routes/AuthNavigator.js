import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';
import Home from '../screens/Home/Home';
import Login from '../screens/Login/Login';

const Stack = createStackNavigator();
const AuthNavigator = () => {
  const {user, loading} = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {user ? (
        <>
          <Stack.Screen name={'Home'} component={Home} />
        </>
      ) : (
        <>
          <Stack.Screen name={'Login'} component={Login} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
