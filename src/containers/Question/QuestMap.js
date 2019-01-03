import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    Platform,
    Dimensions
} from 'react-native';
import MapView, { Marker, AnimatedRegion, Polyline, PROVIDER_GOOGLE } from "react-native-maps";
import PropTypes from "prop-types";
import {Location, Permissions} from 'expo';
import {withNavigation} from 'react-navigation';
import {Entypo, MaterialIcons} from '@expo/vector-icons';

import {colors, fonts} from "../../utils/constants";
import {LIGHT_THEME} from "../../components/Theme/constants";
import {LightMapStyle, NightMapStyle} from "../../components/MapStyles";
import HintIcon from "../../components/icons/HintIcon";
import showDialog from "../../components/CustomPopUpDialog";
import {FormattedMessage, FormattedWrapper} from "react-native-globalize";
import messages from "../../Messages";
import {MapText} from "../styles";

class QuestMap extends Component{

    constructor(){
        super();
        this.state = {
            latitude: null,
            longitude: null,
            prevLatLng: {},
            markerRegion: new AnimatedRegion({
                latitude: 0,
                longitude: 0,
            }),
            borders: [],
            showDialog: false,
            subscriber: null,
        };
    }

    async componentDidMount() {
        // Get permissions and init position watcher
        try {
            /* const serviceStatus = Location.getProviderStatusAsync();

            if (!serviceStatus.locationServicesEnabled) {
                this.props.throwError('Location services disabled');
                return;
            }*/
            const {status} = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                this.props.throwError('Ask for permissions');
                return;
            }
            const watcherSettings = {
                enableHighAccuracy: true,
                timeInterval: 1000,
                distanceInterval: 10,
            };
            const subscriber = await Location.watchPositionAsync(watcherSettings, this._updateLocation);
            if (!subscriber) {
                this.props.throwError('Watcher position error');
                return;
            }
            this.setState({subscriber});
            this._initBorders();
        }
        catch (e) {
            console.log(e);
        }
    }

    _initBorders(){
        if (this.props.stepData !== null && this.props.initialLocation !== null) {
            const toGoLoc = this.props.stepData.location;
            const currLoc = this.props.initialLocation.coords;

            const initialCoords = {
                latitude: parseFloat(currLoc.latitude),
                longitude: parseFloat(currLoc.longitude)
            };
            const coordsToGo = {
                latitude: parseFloat(toGoLoc.lat),
                longitude: parseFloat(toGoLoc.lon)
            };
            this.setState({borders: this.state.borders.concat(initialCoords).concat(coordsToGo)});
        }
    }

    _updateLocation = (newLocation) => {
        try {
            const {markerRegion} = this.state;
            const {latitude, longitude} = newLocation.coords;
            const newCoordinate = {latitude, longitude};

            if (Platform.OS === 'android') {
                if (this.marker) {
                    this.marker._component.animateMarkerToCoordinate(
                        newCoordinate,
                        500,
                    );
                }
            }
            else {
                markerRegion.timing(newCoordinate, 500).start();
            }
            this.setState({
                markerRegion,
                latitude,
                longitude,
                // routeCoordinates: routeCoordinates.concat([newCoordinate]),
                // distanceTravelled: distanceTravelled + this._calcDistance(newCoordinate),
                prevLatLng: newCoordinate,
            });
            /* if (this.timestamp === undefined) {
                this.setState({location:newLocation});
                this.timestamp = Date.now();
            } else {
                const currTime = Date.now();
                const timeElapsed = currTime - this.timestamp;

                if (timeElapsed > 1000) {
                    this.setState({location:newLocation});
                    this.timestamp = currTime;
                }
            }*/
            console.log('Location change: ', newLocation);
            this._validateResult();
        }
        catch (e) {
            console.log(e);
        }
    };

    _validateResult(){
        const currPos = {
            latitude: this.state.latitude,
            longitude: this.state.longitude,
        };
        const range = 8000000000;//this.props.stepData.range;
        const result = true;
        // console.log(this._calcDistance(currPos), ' meters');
        if (this._calcDistance(currPos) <= range) {
            this.state.subscriber.remove();
            this.props.processResult(result);
        }
    }

    _calcDistance(currCoordinates){
        const finnish = this.state.borders[1];
        const haversine = require('haversine');
        return haversine(finnish, currCoordinates, {unit: 'meter'}) || 0;
    }

    /*
     * Map interface functions
     */
    _getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    });

    _fitToElements = () => {
        this.mapRef.fitToCoordinates(this.state.borders, { edgePadding: { top: 70, right: 50, bottom: 50, left: 50 }, animated: true })
    };

    _zoomIn = () =>{
        const region = this.mapRef.__lastRegion;
        const {width, height} = Dimensions.get('window');
        if (region.longitudeDelta > 0.001) {
            region.latitudeDelta *= 0.5;
            region.longitudeDelta = region.latitudeDelta * width / height;
            this.mapRef.animateToRegion(region, 500);
        }
    };

    _zoomOut = () =>{
        const region = this.mapRef.__lastRegion;
        const {width, height} = Dimensions.get('window');
        if (region.longitudeDelta < 60) {
            region.latitudeDelta *= 2;
            region.longitudeDelta = region.latitudeDelta * width / height;
            this.mapRef.animateToRegion(region, 500);
        }
    };

    _toCurrLoc = () => {
        const region = this.mapRef.__lastRegion;
        region.latitude = this.state.latitude;
        region.longitude = this.state.longitude;
        this.mapRef.animateToRegion(region, 500);
    };

    _toDestinationLoc = () => {
        const region = this.mapRef.__lastRegion;
        region.latitude = this.state.borders[1].latitude;
        region.longitude = this.state.borders[1].longitude;
        this.mapRef.animateToRegion(region, 500);
    };

    render(){
        const data = this.props.stepData;
        const {width, height} = Dimensions.get('window');
        const mapStyle = (this.props.theme === LIGHT_THEME)? LightMapStyle : NightMapStyle;
        let content = null;
        if (this.state.latitude !== null){
            const coordsToGo = {
                latitude: parseFloat(data.location.lat),
                longitude: parseFloat(data.location.lon)
            };

            content =
                <View style={{flex: 1}}>
                    <MapView
                        key={this.props.theme}
                        style={{flex: 1}}
                        ref={(ref) => { this.mapRef = ref; }}
                        loadingEnabled
                        zoomEnabled
                        onMapReady={this._fitToElements}
                        initialRegion={this._getMapRegion()}
                        provider={PROVIDER_GOOGLE}
                        customMapStyle={mapStyle}
                    >
                        <Polyline coordinates={this.state.borders} strokeWidth={2} strokeColor={colors.MAIN}/>
                        <Marker.Animated
                            ref={marker => {
                                this.marker = marker;
                            }}

                            coordinate={this.state.markerRegion}
                        />
                        <Marker
                            coordinate={coordsToGo}
                            image={require('../../../assets/icons/map_icon_128.png')}
                        />

                    </MapView>
                    <View style={{position: 'absolute', width: width, flexDirection: 'row', left: 0, top: 0}}>
                        <HintIcon onPress={()=>this.refDialog.show()} size={45}/>
                        <View style={{flex: 1}}>
                            <MapText color={colors.MAIN} font={fonts.EACH}>
                                <FormattedMessage message={'ReachTarget'}/>
                            </MapText>
                        </View>
                    </View>
                    <View style={{position: 'absolute', left: (width-50), top: height*0.4}}>

                        <View style={{flex: 1}}>
                            <Entypo name="circle-with-plus" size={45} color={colors.SECOND.light} onPress={this._zoomIn}/>
                            <Entypo name="circle-with-minus" size={45} color={colors.SECOND.light} onPress={this._zoomOut}/>
                            <MaterialIcons name="my-location" size={45} color={colors.SECOND.light} onPress={this._toCurrLoc}/>
                            <Entypo name="flag" size={45} color={colors.SECOND.light} onPress={this._toDestinationLoc}/>

                        </View>
                    </View>
                </View>
        }
        else {
            content = <ActivityIndicator/>
        }
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <View style={{flex: 1}}>
                    {showDialog(this, <FormattedMessage message={'Hint'}/>, data.hint)}
                    {content}
                </View>
            </FormattedWrapper>
        );
    }
}

QuestMap.propTypes = {
    stepData: PropTypes.object,
};

export default (withNavigation)(QuestMap);
