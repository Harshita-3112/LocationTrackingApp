import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';

import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import style from './styles';

const SignUp = () => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  // const handleSignUp = () => {
  //   if (
  //     name != null &&
  //     name != ' ' &&
  //     name.trim().length > 2 &&
  //     email != null &&
  //     password?.length > 4
  //   ) {
  //     // console.log('name', name.trim(), email, password);

  //     auth()
  //       .createUserWithEmailAndPassword(email, password)
  //       .then(() => {
  //         console.log('success');
  //         navigation.navigate('Home');
  //       })
  //       .catch(error => {
  //         console.log(error, 'error');
  //       });
  //   } else {
  //     Alert.alert('Warning', 'please enter valid details');
  //     return;
  //   }
  // };

  const handleSignUp = () => {
    // Validate Name
    const isValidName = name && name.trim().length > 2;
    if (!isValidName) {
      Alert.alert('Warning', 'Please enter valid name');
      return;
    }

    // Validate Email
    const isValidEmail = email;
    if (!isValidEmail) {
      Alert.alert('Warning', 'Please enter valid email address.');
      return;
    }

    // Validate Password
    const isValidPassword = password && password?.length >= 6;
    if (!isValidPassword) {
      Alert.alert('Warning', 'Password must be at least 6 characters long.');
      return;
    }

    //Firebase authentication
    auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(() => {
        console.log('success');
      })
      .catch(error => {
        console.log(error, 'error');
        Alert.alert('Error', error.message);
      });
  };

  GoogleSignin.configure({
    webClientId:
      '320827919935-dvgcfsjlop99o1mrqf8siqr9qlqiharg.apps.googleusercontent.com',
    offlineAccess: false,
  });

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const res = await GoogleSignin.signIn();
      const idToken = res?.data?.idToken;
      console.log('idToken', idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const user = await auth().signInWithCredential(googleCredential);
      setLoading(false);
      console.log(user, 'user here');
    } catch (error) {
      setLoading(false);
      console.log(error, 'error here');
      Alert.alert('Warning', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Name"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.text}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.text}>Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter Your Password"
        value={password}
        onChangeText={setPassword}
      />
      {/* <Feather name="eye-off" size={22} color={'#B8B8B8'} /> */}

      <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
        <Text style={styles.signUpText}>SignUp</Text>
      </TouchableOpacity>

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 24,
          marginTop: 14,
          alignContent: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{alignSelf: 'center'}}> already have an account? </Text>
        <TouchableOpacity onPress={handleSignIn}>
          <Text
            style={{color: '#54408C', alignSelf: 'center', fontWeight: '500'}}>
            Sign In
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dividerContainer}>
        <View style={styles.divider}></View>
        <Text style={{color: '#A6A6A6'}}>Or </Text>
        <View style={styles.divider}></View>
      </View>

      <TouchableOpacity
        onPress={handleGoogleLogin}
        disabled={loading}
        style={styles.google}>
        <Image
          source={require('../../assets/images/google.png')}
          style={{height: 20, width: 20}}
        />
        <Text style={style.textStyle}>Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
  signUpButton: {
    height: scale(40),
    width: 'auto',
    borderRadius: scale(12),
    backgroundColor: '#54408C',
    marginTop: scale(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    fontSize: scale(16),
    fontWeight: '500',
    color: 'white',
  },
  google: {
    height: 40,
    width: 'auto',
    borderWidth: 1,
    borderColor: 'grey',
    marginTop: scale(50),
    borderRadius: scale(10),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    width: scale(150),
    backgroundColor: 'lightgrey',
  },
  dividerContainer: {
    flexDirection: 'row',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
