import React, {Component} from 'react';
import styled from 'styled-components/native';
import PropTypes from  'prop-types';
import { createStructuredSelector, createSelector } from 'reselect';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {makeSelectData, makeSelectError, makeSelectLoading} from "./selectors";
import saga from './saga';
import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import DataList from './../../components/DataList';
import {loadMuseums} from "./actions";
import RenderMuseumItem from "./RenderMuseumItem";
import {makeSelectLanguage} from "../Locales/selectors";


const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

class MuseumScreen extends Component {

    componentDidMount() {
        this.props.init();
    }

    render() {
        const locale = this.props.language;
        const loading = this.props.loading;
        const error = this.props.error;
        const data = this.props.data;

      // const setData = data ? separateData(data) : false;
        const dataListProps = {
            loading,
            error,
            data,
            locale,
            component: RenderMuseumItem,
        };
      return (
        <ContainerView>
            <DataList {...dataListProps} />
        </ContainerView>
      );
    }
}
MuseumScreen.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
    language: PropTypes.string,
    init: PropTypes.func,
};


export function mapDispatchToProps(dispatch) {
    return {
        init: evt => {
            if (evt !== undefined && evt.preventDefault) evt.preventDefault();
            dispatch(loadMuseums());
        },
    };
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

const withReducer = injectReducer({ key: 'museums', reducer });
const withSaga = injectSaga({ key: 'museums', saga });

export default compose(
    // withRequest,
    withReducer,
    withSaga,
    withConnect,
)(MuseumScreen);

