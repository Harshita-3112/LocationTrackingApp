import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {AuthContext} from '../../context/AuthContext';
import {signIn} from '../../services/Auth/SignIn';
export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwidXNlclJvbGUiOiJTVVBFUl9BRE1JTiIsImlhdCI6MTczMDk3MzI5MCwiZXhwIjoxODQwNjEzMjkwfQ.ZiVCFVRCKWL_PP9WbAXxi8lQeO5UulIPZrg_Uub8gPA';
const SignIn = () => {
  const {handleVerifiedUser} = useContext(AuthContext);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSignIn = async () => {
    try {
      if (!username || username?.trim() === '') {
        Alert.alert('Warning', 'Enter valid username');
        return;
      }

      if (!password || password?.length <= 6) {
        Alert.alert('Warning', 'Enter valid password');
        return;
      }

      const response = await signIn(username, password);
      console.log('res', response.data);
      await AsyncStorage.setItem('token', JSON.stringify(data?.token));

      const authData = response.data?.data;
      await handleVerifiedUser(authData);
    } catch (error) {
      console.log('error here', error?.response?.data);
      Alert.alert(
        'Warning',
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Username</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Username"
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Password"
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleSignIn} style={styles.signInButton}>
        <Text style={styles.signInText}>SignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    marginTop: scale(40),
  },
  textInput: {
    height: scale(40),
    width: 'auto',
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: 'grey',
    padding: scale(10),
    marginTop: scale(10),
  },
  text: {
    fontSize: scale(14),
    fontWeight: '500',
    color: '#343434',
    paddingTop: scale(24),
  },
  signInButton: {
    height: scale(40),
    width: 'auto',
    borderRadius: scale(12),
    backgroundColor: '#54408C',
    marginTop: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInText: {
    fontSize: scale(16),
    fontWeight: '500',
    color: 'white',
  },
});
