import React, {Component} from 'react';
import { Platform, View, ActivityIndicator } from 'react-native';
import { Constants, Location, Permissions } from 'expo';
import {withNavigation} from "react-navigation";

import connect from "react-redux/es/connect/connect";
import {compose} from "redux";

import {createStructuredSelector} from "reselect";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";

import QuestMap from "./QuestMap";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

class LocationQuestion extends Component{

    constructor(){
        super();
        this.state = {
            location: null,
            errorMessage: null,
        };
        this._throwErrorMessage = this._throwErrorMessage.bind(this);
    }

    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }
    }

    _getLocationAsync = async () => {
        try {
            const {status} = await Permissions.askAsync(Permissions.LOCATION);

            if (status !== 'granted') {
                this.setState({
                    errorMessage: 'Permission to access location was denied',
                });
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            this.setState({location});
        }
        catch(e){
            console.log(e);
        }
    };

    _throwErrorMessage(e){
        this.setState({errorMessage: e});
    }

    render() {
        if (this.state.errorMessage)
            return <ErrorMessage message={this.state.errorMessage}/>;
        if (this.state.location !== null)
            return (
                <View style={{flex: 1}}>
                    <QuestMap
                        initialLocation={this.state.location}
                        stepData={this.props.data}
                        theme={this.props.theme}
                        locale={this.props.language}
                        processResult={this.props.processResult}
                        throwError={this._throwErrorMessage}
                    />
                </View>
            );
        return <ActivityIndicator/>;
    }
}
const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose(
    withConnect,
    withNavigation
)(LocationQuestion);
