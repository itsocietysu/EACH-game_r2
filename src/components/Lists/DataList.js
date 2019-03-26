import React from 'react';
import PropTypes from 'prop-types';
import {ActivityIndicator, View, Text, FlatList, ScrollView} from 'react-native';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'
import {colors, fonts} from "../../utils/constants";
import {ErrMessageText} from "../../containers/styles";
import InfoMessage from "../ErrorMessage/InfoMessage";

function DataList({ loading, error, data, Component, notFoundMsg="Not found" }) {
    if (loading) {
        return <View><ActivityIndicator/></View>;
    }

    if (error) {
        return <ErrorMessage/>;
    }

    if (data) {
        return (
            <ScrollView>
                <FlatList
                    data={data}
                    renderItem={({item}) => <Component item={item}/>}
                    keyExtractor = {(item) => item.eid.toString()}
                    extraData = {data}
                />
            </ScrollView>
        );
    }
    return <InfoMessage message={notFoundMsg}/>
}

DataList.propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.any,
    data: PropTypes.any,
    locale: PropTypes.string,
    Component: PropTypes.func.isRequired,
    scroll: PropTypes.bool,
    array: PropTypes.bool,
};

export default DataList;