import React, {Component} from 'react';
import styled from 'styled-components/native';
import PropTypes from  'prop-types';
import { createStructuredSelector, createSelector } from 'reselect';
import {connect} from 'react-redux';
import {compose} from 'redux';

import {makeSelectData, makeSelectError, makeSelectLoading} from "../../redux/selectors/museumSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";


import saga from '../../redux/sagas/museumSaga';
import reducer from '../../redux/reducers/museumReducer';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import DataList from '../../components/Lists/DataList';
import {loadMuseums} from "../../redux/actions/museumActions";
import RenderMuseumItem from "./RenderMuseumItem";
import {colors} from "../../utils/constants";

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
  backgroundColor: ${props => props.color}
`;

class MuseumScreen extends Component {

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
            Component: RenderMuseumItem,
        };
      return (
        <ContainerView color={colors.BASE[theme]}>
            <DataList {...dataListProps} />
        </ContainerView>
      );
    }
}
MuseumScreen.propTypes = {
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
            dispatch(loadMuseums());
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

const withReducer = injectReducer({ key: 'museums', reducer });
const withSaga = injectSaga({ key: 'museums', saga });

export default compose(
    // withRequest,
    withReducer,
    withSaga,
    withConnect,
)(MuseumScreen);

