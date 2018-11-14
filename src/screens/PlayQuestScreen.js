import React, {Component} from 'react';
import {
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import {withNavigation} from 'react-navigation';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {compose} from 'redux';
import PropTypes from "prop-types";


import injectReducer from "../utils/injectReducer";
import reducer from "../containers/ScenarioPage/reducer";
import injectSaga from "../utils/injectSaga";
import saga from "../containers/ScenarioPage/saga";
import {makeSelectLanguage} from "../containers/Locales/selectors";
import {makeSelectData, makeSelectError, makeSelectLoading} from "../containers/ScenarioPage/selectors";
import {loadScenario} from '../containers/ScenarioPage/actions';


import ScenarioItem from "../containers/ScenarioPage/ScenarioItem";


class PlayQuestScreen extends Component{

    componentDidMount(){
        this.props.init();
    }

    render(){
        const locale = this.props.language;
        const loading = this.props.loading;
        const error = this.props.error;
        const data = this.props.data;

        if (loading) {
            return <View><ActivityIndicator/></View>;
        }

        if (error !== false) {
            console.error(error);
            return <Text>Something went wrong</Text>;
        }

        if (data !== false) {
            return (
                <ScenarioItem scenario={data}/>
            );
        }
        return <View/>
    }
}
PlayQuestScreen.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    language: PropTypes.string,
    museumID: PropTypes.number,
    init: PropTypes.func,
};

export function mapDispatchToProps(dispatch, ownProps) {
    return {
        init: evt => {
            const scenarioID = ownProps.navigation.getParam('scenarioID', '');
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadScenario(scenarioID));
        },
    }
}

const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    language: makeSelectLanguage(),
});
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'scenario', reducer });
const withSaga = injectSaga({ key: 'scenario', saga });

export default compose(
    // withRequest,
    withReducer,
    withSaga,
    withConnect,
    withNavigation,
)(PlayQuestScreen);
