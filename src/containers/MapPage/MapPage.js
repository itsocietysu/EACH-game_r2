/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import PropTypes from "prop-types";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, Image } from "react-native";
import PopupDialog, { DialogButton, SlideAnimation } from 'react-native-popup-dialog';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { loadMuseums } from "../../redux/actions/museumActions";
import { makeSelectData, makeSelectError, makeSelectLoading } from "../../redux/selectors/museumSelectors";
import injectSaga from "../../utils/injectSaga";
import saga from "../../redux/sagas/museumSaga";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";

import {LIGHT_THEME} from "../../redux/constants/themeConstants";
import {NightMapStyle, LightMapStyle} from "../../components/MapStyles/MapStyles";
import {colors, fonts} from "../../utils/constants";
import {LATITUDE, LONGITUDE, LATITUDE_DELTA, LONGITUDE_DELTA} from "./constants";

let id = 0;

class MapsScreen extends Component {

  constructor(props) {
    super(props);

    this.state.dialogTheme = this.props.theme;
    this.BuildMarkers = this.BuildMarkers.bind(this);
    this.ShowDialog = this.ShowDialog.bind(this);
  }

  state = {
    markers: [],
    dialog: false,
    dialogTheme: '',
  };

  componentDidMount() {
    if (!this.props.data) this.props.init();
    else this.BuildMarkers();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.data && prevProps.loading)
      this.BuildMarkers();
    if (this.state.dialog !== prevState.dialog) {
      this.refDialog.show();
    }
    if (this.props.theme !== prevState.dialogTheme) {
      this.refDialog.dismiss();
    }
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
            onPress={() => {
                this.ShowDialog(museum, location.name);
            }}
          >
            <Image
                  source={require('../../../assets/icons/map_logo_128.png')}
                  style={{width: 50, height: 50, borderRadius: 25, borderColor: colors.MAIN, borderWidth: 1}}
            />
          </Marker>
        ));
        marker = marker.concat(arr);
      });
    }
    this.setState({ markers: marker });
  }

  ShowDialog(museum, locName) {
    const locale = this.props.locale.toLocaleUpperCase();
    const theme = this.props.theme;
    const more = (this.props.locale === 'ru')? 'подробнее': 'more';
    this.setState({
      dialogTheme: theme,
      showDialog : true,
      dialog: (
      <PopupDialog
        dialogStyle={{backgroundColor: colors.BASE[theme],
          height: '40%',
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          borderColor: colors.MAIN,
        }}
        dialogTitle={<View style={{backgroundColor: colors.BASE[theme], borderBottomWidth: 0.5, borderColor: colors.MAIN}}>
          <Text style={{color: colors.TEXT[theme], textAlign: 'center', fontSize: 20, fontFamily: fonts.EACH}}>
            {museum.name[locale]}
          </Text>
        </View>}
        ref={(popupDialog) => { this.refDialog = popupDialog;}}
        dialogAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        actions={[
          <DialogButton
            textStyle = {styles.dialogButton}
            key = {id++}
            text={more}
            onPress={()=>{
              this.refDialog.dismiss();
              this.props.navigation.navigate('MuseumItem', {data: museum, page: "Maps"});
            }}
          />
        ]}
      >
        <View style = {{ alignItems: 'center', marginTop: 20}}>
            <Image
              style={{width: 95, height: 95}}
              source={{uri: museum.logo}}
            />
          <Text style = {{color: colors.TEXT[theme], textAlign: 'center', fontFamily: fonts.MURRAY}}>
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
  },
  dialogButton: {
    color: colors.MAIN,
    borderColor: colors.MAIN,
    fontSize: 30,
    fontFamily: fonts.MURRAY
  },
});

const withSaga = injectSaga({ key: 'maps', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withConnect)(MapsScreen);
