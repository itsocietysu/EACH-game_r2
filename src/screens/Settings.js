import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import {Button} from 'react-native';
import { compose } from 'redux';
import {createStructuredSelector} from "reselect";
import { changeLanguage } from '../containers/Locales/actions'

import messages from '../Messages';
import injectReducer from "../utils/injectReducer";
import reducer from "../containers/Locales/reducer";
import {loadFeeds} from "../containers/HomePage/actions";


import {makeSelectLanguage} from "../containers/Locales/selectors";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

class SettingsScreen extends Component {
  render() {
      const lang = this.props.language;
      const locale =  this.props.language? this.props.language: 'en';
    return (
			<FormattedWrapper locale={this.props.language? this.props.language: 'en'} messages={messages} >
        <ContainerView>
          <TitleText><FormattedMessage message={'Settings'}/></TitleText>
            <Button title={"Change language to russian"} onPress={()=>this.props.change('ru')}/>
            <Button title={"Change language to english"} onPress={()=>this.props.change('en')}/>
        </ContainerView>
			</FormattedWrapper>
    );
  }
}
export function mapDispatchToProps(dispatch) {
    return {
        change: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(changeLanguage(evt));
        },
    };
}
const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
const withReducer = injectReducer({ key: 'locales', reducer });

export default compose(withConnect, withReducer)(SettingsScreen);
