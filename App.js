import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home/Home';
import Login from './src/screens/Login/Login';
import AuthNavigator from './src/routes/AuthNavigator';
import {AuthProvider} from './src/context/AuthContext';
// import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
        <AuthNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
