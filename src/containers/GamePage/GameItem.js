import React, {Component} from 'react';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {compose} from 'redux';
import PropTypes from "prop-types";
import styled from "styled-components/native";

import {makeSelectLanguage} from "../../components/Locales/selectors";
import QuestItem from "../../components/QuestItem";
import injectReducer from "../../utils/injectReducer";
import reducer from "../GamePage/reducer";
import injectSaga from "../../utils/injectSaga";
import saga from "../GamePage/saga";
import {makeSelectData, makeSelectError, makeSelectLoading} from "../GamePage/selectors";
import {loadGames} from "../GamePage/actions";
import DataList from "../../components/DataList";
import {makeSelectTheme} from "../../components/Theme/selectors";

const ContainerView = styled.View`
  flex: 1;
`;

class GameItem extends Component{

    componentDidMount(){
        this.props.init();
    }

    render(){
        const locale = this.props.language;
        const loading = this.props.loading;
        const error = this.props.error;
        const data = this.props.data;
        const theme = this.props.theme;
        // const setData = data ? separateData(data) : false;
        const dataListProps = {
            loading,
            error,
            data,
            locale,
            theme,
            component: QuestItem,
            scroll: false,
            array: true,
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
