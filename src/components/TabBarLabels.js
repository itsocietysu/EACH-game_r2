import React, {Component} from "react";
import {FormattedWrapper, FormattedMessage} from "react-native-globalize";
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {makeSelectLanguage} from "./Locales/selectors";

import messages from "../Messages";
import {TabBarLabelText} from "../containers/styles";
import {fonts} from "../utils/constants";

class TabBarLabels extends Component {
    render() {
        const {routeName} = this.props.navigation.state;
        const {tintColor} = this.props;
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <TabBarLabelText color={tintColor} font={fonts.MURRAY}>
                    <FormattedMessage message={routeName}/>
                </TabBarLabelText>
            </FormattedWrapper>
        );
    };
}

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
});

const withConnect = connect(mapStateToProps, {});

export default (withConnect)(TabBarLabels);
