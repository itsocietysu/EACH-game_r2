import React, { Component } from 'react';
import PropTypes from "prop-types";
import MapView, { Marker } from 'react-native-maps';
import {StyleSheet, View} from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadMuseums } from "../containers/MuseumPage/actions";
import { makeSelectData, makeSelectError, makeSelectLoading } from "../containers/MuseumPage/selectors";
import injectSaga from "../utils/injectSaga";
import saga from "../containers/MuseumPage/saga";

const LATITUDE = 60.0074;
const LONGITUDE = 30.3729;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA;
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class FavoritesScreen extends Component {

  componentDidMount() {
    if (!this.props.data) this.props.init();
  }

  /*
  onMapPress(e) {
    console.log(e);
  }
  */
  render() {
    const { data } = this.props;
    let markers = [];
    if (data) {
      data.map(museum => {
        const arr = museum.location.map(location => (
          <Marker
            key={id++}
            coordinate={{
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
            }}
            image = {require('./../../assets/icons/map_icon_128.png')}
            title={location.name}
            description={museum.name.RU}
            pinColor={randomColor()}
          />));
        markers = markers.concat(arr);
      })
    }
        return (
            <View style={{flex:1, justifyContent: 'flex-end'}}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  onPress={(e) => this.onMapPress(e)}
                >
                  {markers}
                </MapView>
            </View>
        );
    }
}

FavoritesScreen.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  init: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    init: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadMuseums());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectData(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const styles = StyleSheet.create({
    map:{
        flex: 1,
    }
});

const withSaga = injectSaga({ key: 'maps', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withConnect)(FavoritesScreen);
