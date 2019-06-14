/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import FetchLocation from './components/FetchLocation';
import UsersMap from './components/UsersMap';

const instructions = Platform.select({
  android:
    'Its working',
});

type Props = {};
export default class App extends Component<Props> {
  state={
    userLocation: null
  }
  getUserLocationHandler = () =>{
    navigator.geolocation.getCurrentPosition(
      position =>{
        this.setState({
        userLocation:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121
        }
      });
      fetch('https://my-map-a54cd.firebaseio.com/places.json', {
        method: 'POST',
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Text style={styles.instructions}>{instructions}</Text> */}
        <FetchLocation onGetLocation={this.getUserLocationHandler} />
        <UsersMap userLocation={this.state.userLocation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
