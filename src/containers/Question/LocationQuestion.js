import React, {Component} from 'react';
import { Platform, View } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import QuestMap from "./QuestMap";
import {createStructuredSelector} from "reselect";
import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {makeSelectFonts} from "../../components/Fonts/selectors";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {withNavigation} from "react-navigation";

class LocationQuestion extends Component{

    state = {
        location: null,
        errorMessage: null,
    };

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        const location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <QuestMap data={this.state} stepData={this.props.data} theme={this.props.theme}/>
            </View>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
    font: makeSelectFonts(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose(
    withConnect,
    withNavigation
)(LocationQuestion);
