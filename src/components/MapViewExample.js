import React, {Component} from 'react';
import {Text, StyleSheet, Dimensions, Platform} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Content, View, Header, Body, Right, Left, H1} from 'native-base';
import {Constants} from 'expo';

export default class MapViewExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error:null,
        };
    }


    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("wokeeey");
                console.log(position);
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    onRegionChange(region) {
        this.setState({ region });
    }

    render(){
        return(
            <View style={Platform.OS === 'android' ?{marginTop: Constants.statusBarHeight} : {}}>
                <Header style={{backgroundColor: 'white'}}>
                    <Body>
                        <H1>Map View</H1>
                    </Body>
                    <Right/>
                </Header>
                <MapView
                    style={[styles.map, {width: width, height: height}]}
                    initialRegion={{
                        latitude: 43.697183,
                        longitude: 7.276924,
                        latitudeDelta: 1,
                        longitudeDelta: 1
                    }}>
                    <Marker
                        coordinate={{longitude: 7.276924, latitude: 43.697183}}
                        title={"Shapko Bar"}
                        description={"Fuck them all !"}/>
                    {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                        coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                        latitudeDelta={1}
                        longitudeDelta={1}
                        title={"Your Location"}
                    />}

                </MapView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    stateBar: {
        marginTop: Constants.statusBarHeight,
    },
});

const {
    width, height
} = Dimensions.get('window');
