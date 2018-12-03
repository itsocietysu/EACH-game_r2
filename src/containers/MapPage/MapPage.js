/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from "react-native";
import PopupDialog, { DialogButton, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadMuseums } from "../MuseumPage/actions";
import { makeSelectData, makeSelectError, makeSelectLoading } from "../MuseumPage/selectors";
import injectSaga from "../../utils/injectSaga";
import saga from "../MuseumPage/saga";
import { makeSelectLanguage } from "../../components/Locales/selectors";

const LATITUDE = 60.0074;
const LONGITUDE = 30.3729;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA;
let id = 0;

class MapsScreen extends Component {

  constructor(props) {
    super(props);

    this.BuildMarkers = this.BuildMarkers.bind(this);
    this.ShowDialog = this.ShowDialog.bind(this);
  }

  state = {
    markers: [],
    dialog: false
  };

  componentDidMount() {
    if (!this.props.data) this.props.init();
    else this.BuildMarkers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.dialog !== prevState.dialog) {
      this.refDialog.show();
    }
    if (this.props.data && prevProps.loading)
      this.BuildMarkers();
  }

  BuildMarkers() {
    const { data } = this.props;
    let marker = [];

    if (data) {
      data.map(museum => {
        const arr = museum.location.map(location => (
          <Marker
            key={id++}
            coordinate={{
              latitude: parseFloat(location.latitude),
              longitude: parseFloat(location.longitude),
            }}
            image={require('../../../assets/icons/map_icon_128.png')}
            onPress={() => {
                this.ShowDialog(museum, location.name);
            }}
          />
        ));
        marker = marker.concat(arr);
      });
    }
    this.setState({ markers: marker });
  }

  ShowDialog(museum, locName) {
    const locale = this.props.locale.toLocaleUpperCase();
    this.setState({
      showDialog : true,
      dialog: (
      <PopupDialog
        dialogTitle={<DialogTitle title = {museum.name[locale]}/>}
        ref={(popupDialog) => { this.refDialog = popupDialog;}}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        actions={[
          <DialogButton
            key = {id++}
            text="More..."
            onPress={()=>{
              this.props.navigation.navigate('MuseumItem', {data: museum});
              this.refDialog.dismiss();
            }}
          />
        ]}
      >
        <View>
          <Text>
            <Image
              align={"top"}
              style={{width: 200, height: 200}}
              source={{uri: museum.logo}}
            />
            { locName }
            </Text>
        </View>
      </PopupDialog>
    )});
  }


  render() {
    return (
      <View style={{flex:1, justifyContent: 'flex-end'}}>
        { this.state.dialog }
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          { this.state.markers }
        </MapView>
      </View>
    );
  }
}

MapsScreen.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  locale: PropTypes.string,
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
  locale: makeSelectLanguage(),
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