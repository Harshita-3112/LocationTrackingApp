import axios from 'axios';
import {TOKEN} from '../../screens/SignIn/SignIn';

export const signIn = async (username, password) => {
  console.log('username,password', username, password);
  try {
    const response = await axios({
      url: 'https://rwhvk8p3-9999.inc1.devtunnels.ms/api/auth/v1/signIn',
      method: 'POST',
      data: {
        userName: username,
        password: password,
      },
      // headers: {
      //   Authorization: `Bearer ${TOKEN}`,
      // },
    });
    console.log('res', response);

    return response;
  } catch (error) {
    throw error;
  }
};
