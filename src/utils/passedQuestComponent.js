import React, { Component } from 'react';
import { createStructuredSelector } from "reselect";
import connect from "react-redux/es/connect/connect";
import { compose } from "redux";
import {View, Text} from 'react-native';
import { makeSelectLanguage } from "../components/Locales/selectors";
import { makeSelectTheme } from "../components/Theme/selectors";

class PassedQuest extends Component {
  render() {
    // const image = this.props.image;
    // const theme = this.props.theme;
    // const languige = this.props.languige;
    // const rating = this.props.raiting;

    return(
      <View style = {{
        flexDirection: 'row'
      }}>
       <Text> Hello </Text>
       <Text> world! </Text>
      </View>
    )
  }
}

export function mapDispatchToProps(dispatch) {
  return {}
}

const mapStateToProps = createStructuredSelector({
  language: makeSelectLanguage(),
  theme: makeSelectTheme(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(withConnect)(PassedQuest);