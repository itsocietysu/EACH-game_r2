import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {withNavigation} from 'react-navigation';
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";

import { fetchUserData } from "../../utils/fetchUserData";
import {colors} from "../../utils/constants";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";


class AuthLoadingScreen extends Component {
    constructor(){
        super();
        this._bootstrapAsync();
    };

    _bootstrapAsync = async () => {
        try {
            const userData = await fetchUserData();
            if (userData)
                this.props.navigation.navigate('Profile', {userData});
            else this.props.navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    };

    render(){
        return(
            <View style={{flex: 1, backgroundColor: colors.BASE[this.props.theme]}}>
                <ActivityIndicator size={'large'} color={colors.MAIN}/>
            </View>
        );
    }
}
const mapStateToProps = createStructuredSelector({
    theme: makeSelectTheme(),
});

const withConnect = connect(mapStateToProps, {});

export default compose(withConnect, withNavigation)(AuthLoadingScreen);
