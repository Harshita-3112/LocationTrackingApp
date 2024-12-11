import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthContext} from '../context/AuthContext';
import Home from '../screens/Home/Home';

import SignUp from '../screens/SignUp/SignUp';
import SignIn from '../screens/SignIn/SignIn';

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
          {/* <Stack.Screen name={'SignUp'} component={SignUp} /> */}
          <Stack.Screen name={'SignIn'} component={SignIn} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
