import axios from 'axios';
import {TOKEN} from '../../screens/SignIn/SignIn';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createTracking = async (latitude, longitude) => {
  try {
    const response = await axios({
      url: 'https://rwhvk8p3-9999.inc1.devtunnels.ms/api/trackings/v1',
      method: 'POST',
      data: {
        userId: 1,
        zoneId: 1,
        geoPoints: {
          latitude: latitude,
          longitude: longitude,
        },
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};
