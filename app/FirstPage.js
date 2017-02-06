import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import AccelerometerChart from './AccelerometerChart';
import GyroscopeChart from './GyroscopeChart';
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
export default class FirstPage extends Component {
  render() {
    return <ScrollView contentContainerStyle={styles.contentContainer}>
      <AccelerometerChart />
      <GyroscopeChart />
    </ScrollView>
  }
}
