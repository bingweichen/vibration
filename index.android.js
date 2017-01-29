/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FirstPage from './app/FirstPage';
export default class vibration extends Component {
  render() {
    return <FirstPage/>
  }
}
AppRegistry.registerComponent('vibration', () => vibration);
