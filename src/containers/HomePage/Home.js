import React, { Component } from 'react';
import PropTypes from "prop-types";
import styled from 'styled-components/native';
import { createStructuredSelector } from 'reselect';
import ScrollView from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';

// import { withRequest } from '../../utils/auth';
import RenderFeed from "../RenderFeedItem";
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import DataList from "./../../components/DataList"

import {loadFeeds} from "./actions";
import {
    makeSelectData,
    makeSelectError,
    makeSelectLoading,
} from './selectors';
import reducer from "./reducer";
import saga from "./saga";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

function separateData(data) {
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
}

class HomeScreen extends Component {
    componentDidMount() {
        this.props.init();
    }
    render() {
      const { loading, error, data } = this.props;
      const setData = data ? separateData(data) : false;
      const dataListProps = {
          loading,
          error,
          data: setData,
          component: RenderFeed,
          scroll: false,
          array: true,
      };
      return (
        <ContainerView>
            <DataList {...dataListProps} />
        </ContainerView>
      );
    }
}
HomeScreen.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
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

