import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {compose} from 'redux';
import PropTypes from "prop-types";
import styled from "styled-components/native";


import QuestItem from "../../components/QuestItem/QuestItem";
import injectReducer from "../../utils/injectReducer";
import reducer from "../../redux/reducers/gameReducer";
import injectSaga from "../../utils/injectSaga";
import saga from "../../redux/sagas/gameSaga";

import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectData, makeSelectError, makeSelectLoading} from "../../redux/selectors/gameSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";

import {loadGames} from "../../redux/actions/gameActions";
import DataList from "../../components/Lists/DataList";
import getUserGameData from "../../utils/getUserGameData";
import {markDataStatus} from "../../utils/markDataStatus";
import {makeSelectAuth} from "../../redux/selectors/authSelectors";
import {FormattedMessage} from "react-native-globalize";

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

        if (this.state.userData && data) {
            markDataStatus(data, this.state.userData.gameData);
        }

        const dataListProps = {
            loading,
            error,
            data,
            Component: QuestItem,
            notFoundMsg: <FormattedMessage message={'QuestsNotFound'}/>
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
