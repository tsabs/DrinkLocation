import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';
import {Router, Stack, Scene} from 'react-native-router-flux';
import MapView from './src/components/MapViewExample';
import {Constants} from "expo";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Stack key={'root'} hideNavBar={true}>
            <Scene
                component={MapView}
                initial={true}
                key={'MapView'}
                title={'Map View'}/>
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    },

    stateBar: {
        marginTop: Constants.statusBarHeight,
    },

    state_bar: {
        marginTop: StatusBar.currentHeight
    }
});
