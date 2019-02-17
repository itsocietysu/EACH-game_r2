import React, { Component } from 'react';
import {Font, AppLoading, Asset, Constants} from 'expo';
import {StatusBar, YellowBox, View} from 'react-native';
import { Provider, connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { FormattedWrapper } from 'react-native-globalize';
import FlashMessage from "react-native-flash-message";
import {createStructuredSelector} from "reselect";

import messages from './Messages';
import configureStore from './configureStore';
import Navigator from './Navigator';
import { colors } from './utils/constants';

import {makeSelectAuth} from "./components/Auth/selectors";
import {makeSelectLanguage} from "./components/Locales/selectors";
import {makeSelectTheme} from "./components/Theme/selectors";

const initialState = {};
const history = {};
const store = configureStore(initialState, history);

// Ignore boilerplate warning
YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop `children` supplied to `FormattedWrapper`, expected a ReactNode']);

class RootContainer extends Component {
    render() {
        const theme = this.props.theme;
        const barStyle = (theme === 'light')?'dark-content':'light-content';
        return (
            <ThemeProvider theme={colors}>
                <FormattedWrapper locale={this.props.locale} messages={messages}>
                    <View style={{flex: 1}}>
                        <StatusBar barStyle={barStyle} backgroundColor={colors.MAIN} />
                        <Navigator />
                        <FlashMessage position={'top'} duration={3000}/>
                    </View>
                </FormattedWrapper>
            </ThemeProvider>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
    theme: makeSelectTheme(),
    auth: makeSelectAuth(),
});

const ConnectedRootContainer = connect(mapStateToProps,null)(RootContainer);

YellowBox.ignoreWarnings(['You are not currently signed in to Expo on your development machine. As a result, the redirect URL for AuthSession will be']);
// Ignore boilerplate warning
YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop `children` of type `object` supplied to `Provider`, expected a single ReactElement.']);

class App extends Component {
    state = {
        isReady: false,
    };

    async _loadAssetsAsync() {
        const images = [
            require('../assets/images/welcome_screen_blue.svg'),
            require('../assets/images/errorPage.png'),
            require('../assets/images/errorPageDark.png'),
            require('../assets/images/arrowUp.png'),
            require('../assets/images/arrowDown.png'),
            require('../assets/images/muz_header_white.png'),
            require('../assets/images/muz_header_dark.png'),
            require('../assets/images/its_logo_white.png'),
            require('../assets/icons/logo-google.svg'),
            require('../assets/icons/logo-each.svg'),
            require('../assets/icons/logo-vk.svg'),
            // TODO: add logo social networks
        ];

        const imageAssets = images.map((image) => Asset.fromModule(image).downloadAsync());

        const fontAssets = Font.loadAsync({
            eachFont: require('../assets/fonts/eachFont.ttf'),
            murray: require('../assets/fonts/MurraySlab.otf'),
        });
        await Promise.all([...imageAssets, ...fontAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={alert}
                />
            );
        }
        return (
            <Provider store={store}>
                <ConnectedRootContainer />
            </Provider>
      );
    }
}

export default App;
