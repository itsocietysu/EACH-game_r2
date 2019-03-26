import React, { Component } from 'react';
import {Font, AppLoading, Asset, Constants} from 'expo';
import {StatusBar, YellowBox, View, SafeAreaView} from 'react-native';
import { Provider, connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { FormattedWrapper } from 'react-native-globalize';
import FlashMessage from "react-native-flash-message";
import {createStructuredSelector} from "reselect";

import messages from './Messages';
import configureStore from './configureStore';
import Navigator from './Navigator';
import { colors } from './utils/constants';

import {makeSelectAuth} from "./redux/selectors/authSelectors";
import {makeSelectLanguage} from "./redux/selectors/localesSelectors";
import {makeSelectTheme} from "./redux/selectors/themeSelectors";

const initialState = {};
const history = {};
const store = configureStore(initialState, history);

// Ignore boilerplate warning
// YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop `children` supplied to `FormattedWrapper`, expected a ReactNode']);

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
// TODO: remove yellow boxes if possible
// YellowBox.ignoreWarnings(['Util.getCurrentLocaleAsync is deprecated, use Localization.getCurrentLocaleAsync']);
// YellowBox.ignoreWarnings(['You are not currently signed in to Expo on your development machine. As a result, the redirect URL for AuthSession will be']);
// Ignore boilerplate warning
// YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop `children` of type `object` supplied to `Provider`, expected a single ReactElement.']);

class App extends Component {
    state = {
        isReady: false,
    };

    async _loadAssetsAsync() {
        const images = [
            require('../assets/images/errorPage.png'),
            require('../assets/images/errorPageDark.png'),
            require('../assets/images/arrowUp.png'),
            require('../assets/images/arrowDown.png'),
            require('../assets/images/muz_header_white.png'),
            require('../assets/images/muz_header_dark.png'),
            require('../assets/images/its_logo_white.png'),
            require('../assets/icons/map_logo_128.png'),
            require('../assets/icons/logo-google.png'),
            require('../assets/icons/logo-each.png'),
            require('../assets/icons/logo-vk.png'),
            require('../assets/images/welcome_screen_blue.png'),
            // TODO: add logo social networks
        ];

        const imageAssets = Asset.loadAsync(images);

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
                    onError={console.warn}
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
