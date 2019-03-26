import React, { Component } from 'react';
import {Button} from 'react-native';
import PropTypes from "prop-types";
import styled from 'styled-components/native';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';

import reducer from "../../redux/reducers/feedReducer";
import saga from "../../redux/sagas/feedSaga";
import {loadFeeds} from "../../redux/actions/feedActions";

import DataList from "../../components/Lists/DataList";
import RenderFeedItem from "./RenderFeedItem";
import {colors} from "../../utils/constants";

import { makeSelectData, makeSelectError, makeSelectLoading } from '../../redux/selectors/feedSelectors';
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";



const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.color}
`;

/* function separateData(data) {
    const derData = [];
    let item = [];
    data.forEach(element => {
        const len = item.push(element);
        if (len === 2) {
            derData.push(item);
            item = [];
        }
    });
    if (item.length) derData.push(item);
    return derData;
} */

class HomeScreen extends Component {
    componentDidMount() {
        this.props.init();
    }

    render() {
        const loading = this.props.loading;
        const error = this.props.error;
        const data = this.props.data;
        const theme = this.props.theme;
        // const setData = data ? separateData(data) : false;
        const dataListProps = {
            loading,
            error,
            data,
            Component: RenderFeedItem,
        };
        return (
            <ContainerView color={colors.BASE[theme]}>
                <DataList {...dataListProps} />
            </ContainerView>
        );
    }
}
HomeScreen.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    theme: PropTypes.string,
    init: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
    return {
        init: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadFeeds());
        },
    };
}

const mapStateToProps = createStructuredSelector({
    data: makeSelectData(),
    loading: makeSelectLoading(),
    error: makeSelectError(),
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'feeds', reducer });
const withSaga = injectSaga({ key: 'feeds', saga });

export default compose(
    // withRequest,
    withReducer,
    withSaga,
    withConnect,
)(HomeScreen);

