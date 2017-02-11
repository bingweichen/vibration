/**
 * navigation page
 * import flux frame
 */

import React, { Component  } from 'react';
import {
    View,
    Image,
    Text,
    StyleSheet,
} from 'react-native';
import { Router, Scene ,Actions} from 'react-native-router-flux';
import FirstPage from './FirstPage';
import Welcome from './Welcome';
export default class App extends Component {
    render(){
        return (
            <Router >
                <Scene key="root">
                    <Scene key="Welcome" component={Welcome} hideNavBar title="Welcome"/>
                    <Scene key="FirstPage" component={FirstPage} hideNavBar title="FirstPage"/>
                </Scene>
            </Router>
        )
    }
}