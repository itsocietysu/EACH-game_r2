import React, { Component } from 'react';
import {Font, AppLoading, Asset} from 'expo';
import {StatusBar, Platform, YellowBox, View} from 'react-native';
import { Provider, connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';
import { FormattedWrapper } from 'react-native-globalize';

import messages from './Messages';
import configureStore from './configureStore';
import FlashMessage from "react-native-flash-message";
import Navigator from './Navigator';
import { colors } from './utils/constants';
import {createStructuredSelector} from "reselect";
import {makeSelectAuth} from "./components/Auth/selectors";
import {makeSelectLanguage} from "./components/Locales/selectors";
import {makeSelectTheme} from "./components/Theme/selectors";
import {fontLoaded} from "./components/Fonts/actions";

const Root = styled.View`
flex: 1;
background-color: ${'#ff0000'};
`;

const StatusBarAndroid = styled.View`
height: 24;
background-color: ${props => props.color};
`;

const StatusBarIOS = styled.View`
height: 24
backgroundColor: ${props => props.color}
`;

const initialState = {};
const history = {};
const store = configureStore(initialState, history);

// Ignore boilerplate warning
YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop `children` supplied to `FormattedWrapper`, expected a ReactNode']);

class RootContainer extends Component {
  render() {
    let StatusBarOS = null;
    const theme = this.props.theme;
    if(Platform.OS === 'android' && Platform.Version >= 20)
        StatusBarOS = <StatusBarAndroid color={colors.BASE[theme]} />;
    else if(Platform.OS === 'ios')
        StatusBarOS = <StatusBarIOS color={colors.BASE[theme]}/>;

    const barStyle = (theme === 'light')?'dark-content':'light-content';
    return (
      <ThemeProvider theme={colors}>
        <FormattedWrapper locale={this.props.locale} messages={messages}>
          <Root>
            <StatusBar barStyle={barStyle} translucent />
              {StatusBarOS}
            <Navigator />
              <FlashMessage position={'top'} duration={3000}/>
          </Root>
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
            require('../assets/images/loading_screen.png'),
        ];

        const imageAssets = images.map((image) => {
            return Asset.fromModule(image).downloadAsync();
        });

        const fontAssets = Font.loadAsync([{
            eachFont: require('../assets/fonts/eachFont.ttf'),
            murray: require('../assets/fonts/MurraySlab.otf'),
        }]);
        store.dispatch(fontLoaded());
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
