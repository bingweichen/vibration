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
import MyChart from './myChart';
import AccelerometerChart from './AccelerometerChart';
import GyroscopeChart from './GyroscopeChart';
// import PieReact from './PieReact';
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
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
