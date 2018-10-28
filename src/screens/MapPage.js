/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet,  View, Text, Image } from "react-native";
import PopupDialog, { DialogButton, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadMuseums } from "../containers/MuseumPage/actions";
import { makeSelectData, makeSelectError, makeSelectLoading } from "../containers/MuseumPage/selectors";
import injectSaga from "../utils/injectSaga";
import saga from "../containers/MuseumPage/saga";
// import { DescriptionText, TextContainer, TittleText } from "../containers/styles";
// import { MuseumItemScreen } from "../containers/MuseumPage/MuseumItem"

const LATITUDE = 60.0074;
const LONGITUDE = 30.3729;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA;
let id = 0;

class MapsScreen extends Component {

  state = {
    myDialogTitle: "Hello",
    myDialogMessage: "world",
    myDialogMuseum: this.props.data
  };

  componentDidMount() {
    if (!this.props.data) this.props.init();
  }

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
            title={museum.name.RU}
            description={"(touch me!)"}
            onCalloutPress={() => {
              this.popupDialog.show();
            }}
            onPress={() => {
              // Marker.showCallout();
              /*
              this.setState({
                myDialogTitle: museum.name.RU,
                myDialogMessage: location.name,
                myDialogMuseum: museum,
              });*/
            }}
          />
        ));
        markers = markers.concat(arr);
      })
    }
        return (
            <View style={{flex:1, justifyContent: 'flex-end'}}>
              <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                dialogTitle = {<DialogTitle title={this.state.myDialogTitle} />}
                dialogAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
                })}
                actions={
                  <DialogButton
                    text="More..."
                    onPress={() => {
                       this.props.navigation.navigate('MuseumPage', this.state.myDialogMuseum);
                    }}
                  />
                }
              >
                <View>
                  <Image
                    // align={"left"}
                    source = {require('./../../assets/icons/map_icon_128.png')}
                  />
                  <Text> hello </Text>
                </View>
              </PopupDialog>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                >
                  {markers}
                </MapView>
            </View>
        );
    }
}


MapsScreen.propTypes = {
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
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
    map:{
        flex: 1,
    }
});

const withSaga = injectSaga({ key: 'maps', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withConnect)(MapsScreen);
