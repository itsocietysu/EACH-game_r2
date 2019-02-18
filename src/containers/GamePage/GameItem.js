import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {compose} from 'redux';
import PropTypes from "prop-types";
import styled from "styled-components/native";


import QuestItem from "../../components/QuestItem";
import injectReducer from "../../utils/injectReducer";
import reducer from "../GamePage/reducer";
import injectSaga from "../../utils/injectSaga";
import saga from "../GamePage/saga";

import {makeSelectLanguage} from "../../components/Locales/selectors";
import {makeSelectData, makeSelectError, makeSelectLoading} from "../GamePage/selectors";
import {makeSelectTheme} from "../../components/Theme/selectors";

import {loadGames} from "../GamePage/actions";
import DataList from "../../components/DataList";
import getUserGameData from "../../utils/getUserGameData";
import {markDataStatus} from "../../utils/markDataStatus";
import {makeSelectAuth} from "../../components/Auth/selectors";

const ContainerView = styled.View`
  flex: 1;
`;

class GameItem extends Component{
    state={
        userData: null,
    };

    async componentDidMount(){
        const data = await getUserGameData();
        this.setState({userData: data});
        this.props.init();
    }

    render(){
        let loading = this.props.loading;
        const error = this.props.error;
        const data = this.props.data;
        if (this.state.userData && data && this.props.auth){
            markDataStatus(data, this.state.userData.gameData);
        }
        else
            loading = true;

        const dataListProps = {
            loading,
            error,
            data,
            Component: QuestItem,
        };
        return(
            <ContainerView>
                <DataList {...dataListProps} />
            </ContainerView>
        );
    }
}
GameItem.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    language: PropTypes.string,
    theme: PropTypes.string,
    museumID: PropTypes.number,
    init: PropTypes.func,
};
export function mapDispatchToProps(dispatch, ownProps) {
    return {
        init: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadGames(ownProps.museumID));
        },
    }
}

const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
    auth: makeSelectAuth(),
});
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'games', reducer });
const withSaga = injectSaga({ key: 'games', saga });

export default compose(
    // withRequest,
    withReducer,
    withSaga,
    withConnect,
)(GameItem);
