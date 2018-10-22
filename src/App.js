import React, { Component } from 'react';
import { StatusBar, Platform, YellowBox } from 'react-native';
import { Provider, connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components/native';
import { FormattedWrapper } from 'react-native-globalize';

import messages from './Messages';
import configureStore from './configureStore';

import Navigator from './Navigator';
import { colors } from './utils/constants';

const Root = styled.View`
flex: 1;
background-color: ${props => props.theme.SOFT};
`;

const StatusBarAndroid = styled.View`
height: 24;
background-color: ${props => props.theme.ORANGE};
`;
const initialState = {};
const history = {};
const store = configureStore(initialState, history);

// Ignore boilerplate warning
YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop `children` supplied to `FormattedWrapper`, expected a ReactNode']);

class RootContainer extends Component {
  render() {
    return (
      <ThemeProvider theme={colors}>
        <FormattedWrapper /*locale={this.props.state.Language.language}*/ messages={messages}>
          <Root>
            <StatusBar barStyle='light-content' backgroundColor='transparent' translucent />
            { Platform.OS === 'android' && Platform.Version >= 20 ? <StatusBarAndroid /> : null }
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

// Ignore boilerplate warning
YellowBox.ignoreWarnings(['Warning: Failed prop type: Invalid prop `children` of type `object` supplied to `Provider`, expected a single ReactElement.']);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
			  <ConnectedRootContainer />
      </Provider>
    );
  }
}

export default App;
