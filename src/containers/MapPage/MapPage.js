/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from "react-native";
import PopupDialog, { DialogButton, DialogTitle, SlideAnimation } from 'react-native-popup-dialog';
import {Font} from 'expo';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { loadMuseums } from "../MuseumPage/actions";
import { makeSelectData, makeSelectError, makeSelectLoading } from "../MuseumPage/selectors";
import injectSaga from "../../utils/injectSaga";
import saga from "../MuseumPage/saga";
import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {LIGHT_THEME} from "../../components/Theme/constants";
import {NightMapStyle, LightMapStyle} from "../../components/MapStyles";
import {colors} from "../../utils/constants";


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
    Font.loadAsync({
      'eachFont': require('../../../assets/fonts/eachFont.ttf'),
      'MurraySlab': require('../../../assets/fonts/MurraySlab.otf'),
    });
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
    const theme = this.props.theme;
    const fontLoaded = this.props.font;

    this.setState({
      showDialog : true,
      dialog: (
      <PopupDialog
        dialogStyle={{backgroundColor: colors.BASE[theme],
          height: 220,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderColor: colors.MAIN,
        }}
        dialogTitle={<View style={{backgroundColor: colors.BASE[theme], borderBottomWidth: 0.5, borderColor: colors.MAIN}}>
          <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: 20, fontFamily: 'eachFont'}}>
            {museum.name[locale]}
          </Text>
        </View>}
        ref={(popupDialog) => { this.refDialog = popupDialog;}}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        actions={[
          <DialogButton
            textStyle = {{color: colors.MAIN, borderColor: colors.MAIN, fontSize: 30}}

            key = {id++}
            text="More"
            onPress={()=>{
              this.props.navigation.navigate('MuseumItem', {data: museum, page: "Maps"});

              this.refDialog.dismiss();
            }}
          />
        ]}
      >
        <View>
          <Text style = {{color: colors.TEXT[theme], textAlign: 'center', marginTop: 20}}>
            <Image
              style={{width: 230, height: 230, borderRadius: 10, borderTopWidth: 3}}
              source={{uri: museum.logo}}
            />
          </Text>
          <Text style = {{color: colors.TEXT[theme], textAlign: 'center', fontFamily: 'MurraySlab'}}>
            { locName }
          </Text>
        </View>
      </PopupDialog>
    )});
  }


  render() {
    const mapStyle = (this.props.theme === LIGHT_THEME)? LightMapStyle : NightMapStyle;
    return (
      <View style={{flex:1, justifyContent: 'flex-end'}}>
        { this.state.dialog }
        <MapView
            key={this.props.theme}
            style={styles.map}
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
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
  theme: makeSelectTheme(),
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
