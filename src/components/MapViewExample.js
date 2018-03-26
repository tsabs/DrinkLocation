import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Dimensions, Platform} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Content, View, Header, Body, Right, Left, H1, Text, Footer, Grid, Row} from 'native-base';
import {Constants} from 'expo';

let Polyline = require('@mapbox/polyline');

const {
    width, height
} = Dimensions.get('window');

export default class MapViewExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: null,
            longitude: null,
            error: null,
            concat: null,
            coords:[],
            x: 'false',
            cordLatitude:"43.697183",
            cordLongitude:"7.276924",

            showPath: false
        };

        this.mergeLot = this.mergeLot.bind(this);
        this.onRegionChange = this.onRegionChange.bind(this);
        this.handleShowPath = this.handleShowPath.bind(this);
    }

    mergeLot(){
        if (this.state.latitude != null && this.state.longitude!=null)
        {
            let concatLot = this.state.latitude +","+this.state.longitude;
            this.setState({
                concat: concatLot
            }, () => {
                this.getDirections(concatLot, "43.697183,7.276924");
            });
        }
    }

    getDirections(startLoc, destinationLoc) {
        fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }`)
            .then(response => response.json())
            .then((responseJson) => {
                let points = Polyline.decode(responseJson.routes[0].overview_polyline.points);
                let coords = points.map((point, index) => {
                    return  {
                        latitude : point[0],
                        longitude : point[1]
                    }
                });
                this.setState({coords: coords})
                this.setState({x: "true"})
                return coords
            })
            .catch((err) => {
                console.log('masuk fungsi')
                this.setState({x: "error"})
                return err
            });
    }


    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,

                    error: null,
                });
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );

        //this.pathMarker()
    }

    handleShowPath(){
        this.setState({
            showPath: !this.state.showPath
        })
    }


    pathMarker(){

        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=1313 Disneyland Dr, Anaheim, CA 92802, USA&destination=Universal+Studios+Hollywood4&key=AIzaSyCAMUMAL8hNxHfNwqhgs7y0iFmUye-wS2U')
            .then(response => response.json())
            .then(responseJson => {
                //console.log(responseJson)
            }).catch(e => {console.warn(e)});
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId);
    }

    onRegionChange(region) {
        const reg = {

        }
        //console.log('onRegionChange', region);
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
                <Grid>
                    <Row>
                <MapView
                    followsUserLocation={true}
                    showsUserLocation
                    style={[styles.map, {width: width, height: height*0.8}]}>
                    <Marker
                        //image={"../../assets/img/shapko.jpg"}
                        identifier={"shapko"}
                        coordinate={{longitude: 7.276924, latitude: 43.697183}}
                        title={"Shapko Bar"}
                        description={"Fuck them all !"}/>
                    <MapView.Polyline
                        coordinates={this.state.coords}
                        strokeWidth={2}
                        strokeColor="red"/>

                    <Marker
                        identifier={"taverne"}
                        coordinate={{longitude: 7.277120, latitude: 43.697323}}
                        title={"La Taverne"}
                        description={"Fuck them all !"}/>

                    <Marker
                        identifier={"loco"}
                        coordinate={{longitude: 7.022283, latitude: 43.551451}}
                        title={"Coco Loco"}
                        description={"Fuck them all !"}/>

                </MapView>
                    </Row>
                    <Row>
                <Footer>
                    <TouchableOpacity onPress={this.mergeLot}>
                        <Text>Show Path</Text>
                    </TouchableOpacity>
                </Footer>
                    </Row>
                </Grid>
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
