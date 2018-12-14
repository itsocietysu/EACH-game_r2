import React, { Component } from 'react';
import {Font} from 'expo';
import { StatusBar, Platform, YellowBox } from 'react-native';
import { Provider, connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';
import { FormattedWrapper } from 'react-native-globalize';

import messages from './Messages';
import configureStore from './configureStore';

import Navigator from './Navigator';
import { colors } from './utils/constants';
import {fontLoaded} from "./components/Fonts/actions";
import PropTypes from "prop-types";

const Root = styled.View`
flex: 1;
background-color: ${props => props.theme.WHITE};
`;

const StatusBarAndroid = styled.View`
height: 24;
background-color: rgb(255,255,255);
`;

const StatusBarIOS = styled.View`
height: 24;
background-color: rgb(255,255,255);
`;

const initialState = {};
const history = {};
const store = configureStore(initialState, history);

// Ignore boilerplate warning
YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop `children` supplied to `FormattedWrapper`, expected a ReactNode']);

class RootContainer extends Component {
  render() {
    let StatusBarOS = null;
    if(Platform.OS === 'android' && Platform.Version >= 20)
        StatusBarOS = <StatusBarAndroid />;
    else if(Platform.OS === 'ios')
        StatusBarOS = <StatusBarIOS />;
    return (
      <ThemeProvider theme={colors}>
        <FormattedWrapper /*locale={this.props.state.Language.language}*/ messages={messages}>
          <Root>
            <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent />
              {StatusBarOS}
            <Navigator />
          </Root>
        </FormattedWrapper>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
	state,
});

const ConnectedRootContainer = connect(mapStateToProps,null)(RootContainer);

YellowBox.ignoreWarnings(['You are not currently signed in to Expo on your development machine. As a result, the redirect URL for AuthSession will be']);
// Ignore boilerplate warning
YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop `children` of type `object` supplied to `Provider`, expected a single ReactElement.']);

class App extends Component {
    async componentDidMount(){
        try{
                await Font.loadAsync({
                    eachFont: require('../assets/fonts/eachFont.ttf'),
                    murray: require('../assets/fonts/MurraySlab.otf'),
                });
                store.dispatch(fontLoaded());
            }
            catch (e) {
                console.log('Fonts are not loaded: ', e);
            }
        }

      render() {
      return (
        <Provider store={store}>
                <ConnectedRootContainer />
        </Provider>
      );
    }
}

export default App;
