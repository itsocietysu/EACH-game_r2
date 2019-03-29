import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {withNavigation} from 'react-navigation';
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";

import { fetchUserData } from "../../utils/fetchUserData";
import {colors} from "../../utils/constants";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";
import {makeSelectAuth} from "../../redux/selectors/authSelectors";
import ProfileScreen from "./Profile";
import LoginScreen from "./Login";


class AuthLoadingScreen extends Component {

    componentDidUpdate(){
        this._proceed()
    }

    componentDidMount(){
        this._proceed()
    }

    _proceed(){
        if (this.props.auth)
            this.props.navigation.navigate('Profile');
        else
            this.props.navigation.navigate('Login');
    }
    render(){
        return(
            <View style={{flex: 1, backgroundColor: colors.BASE[this.props.theme]}}>
                <ActivityIndicator size={'large'} color={colors.MAIN}/>
            </View>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    auth: makeSelectAuth(),
    theme: makeSelectTheme(),
});

const withConnect = connect(mapStateToProps, {});

export default compose(withConnect, withNavigation)(AuthLoadingScreen);
