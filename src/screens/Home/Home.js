import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StyleSheet,
} from 'react-native';

import BackgroundGeolocation, {
  Location,
} from 'react-native-background-geolocation';
import {scale} from 'react-native-size-matters';
import auth from '@react-native-firebase/auth';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Home = () => {
  const [enabled, setEnabled] = useState(false);
  const [location, setLocation] = useState(null); //user location
  const [region, setRegion] = useState(null); //map region

  const handleLogOut = async () => {
    await auth().signOut();
  };

  useEffect(() => {
    const onLocation = BackgroundGeolocation.onLocation(location => {
      console.log('[onLocation]', location);
      const {latitude, longitude} = location.coords;
      setLocation({latitude, longitude});
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    });

    // Configure the background geolocation plugin
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 5,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false,
      startOnBoot: true,
      notification: {
        title: 'Tracking Location',
        sticky: true,
      },
    }).then(state => {
      setEnabled(state.enabled);
      console.log('BackgroundGeolocation is ready:', state.enabled);
    });

    return () => {
      onLocation.remove();
    };
  }, []);

  const handleStartTracking = async () => {
    try {
      await BackgroundGeolocation.start();
      setEnabled(true);
    } catch (error) {
      console.error('Failed to start tracking:', error);
    }
  };

  const handleStopTracking = async () => {
    try {
      await BackgroundGeolocation.stop();
      setEnabled(false);
      setLocation('');
    } catch (error) {
      console.error('Failed to stop tracking:', error);
    }
  };

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={enabled ? handleStopTracking : handleStartTracking}
        style={styles.CTAButton}>
        <Text style={styles.text}>
          {enabled ? 'Stop Tracking' : 'Start Tracking'}
        </Text>
      </TouchableOpacity>

      <View style={styles.latLonContainer}>
        <Text>
          {location
            ? `Latitude: ${location.latitude},                 Longitude: ${location.longitude}`
            : 'Location not available'}
        </Text>
      </View>

      {region && enabled && (
        <View style={styles.mapContainer}>
          <MapView
            followsUserLocation
            provider={PROVIDER_GOOGLE}
            style={{flex: 1}}
            region={region}>
            <Marker coordinate={region} title="Your Location" />
          </MapView>
        </View>
      )}

      <TouchableOpacity onPress={handleLogOut} style={styles.logOutButton}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(18),
  },
  CTAButton: {
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: '#54408C',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: scale(40),
  },
  logOutButton: {
    height: scale(40),
    borderRadius: scale(10),
    backgroundColor: '#54408C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(10),
  },
  latLonContainer: {
    marginTop: scale(10),
    backgroundColor: '#E5E4E2',
    borderRadius: scale(4),
  },
  mapContainer: {
    borderRadius: scale(10),
    borderWidth: 2,
    borderColor: 'lightgrey',
    flex: 1,
    marginVertical: scale(12),
    overflow: 'hidden',
  },
  text: {
    color: 'white',
    fontSize: scale(14),
    fontWeight: '500',
  },
});