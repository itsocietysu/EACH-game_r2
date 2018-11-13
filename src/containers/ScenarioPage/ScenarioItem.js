import React, {Component} from 'react';
import {
    View,
    Text,
} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {compose} from 'redux';
import PropTypes from "prop-types";
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';

import {makeSelectLanguage} from "../Locales/selectors";

class ScenarioItem extends Component{
    state = {
        currentStep: 1,
    };

    render(){
        const scenario = this.props.scenario[0].scenario;
        return(
            <View style={{flex:1}}>
                <Text>{scenario.steps[0].type}</Text>
            </View>
        );
    }
}
ScenarioItem.propTypes = {

};

export function mapDispatchToProps(dispatch, ownProps) {
    return {
    }
}

const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    // withRequest,
    withConnect,
)(ScenarioItem);
