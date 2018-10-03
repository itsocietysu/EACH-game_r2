import React from 'react';
import {ScrollView, Text, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import RenderFeedItem from './../containers/RenderFeedItem';

export default function ScrollList(props) {
    const ComponentToRender = props.component;
    let content;
    if (props.data){
        const data = props.data;
        // const k = componentToRender(data[0]);
        content =
            <FlatList
                data={data}
                renderItem={({item}) => <ComponentToRender item={item}/>}
            />

    }
    else
        content = <Text>Empty field</Text>;
    return <ScrollView>{content}</ScrollView>
}

ScrollList.propTypes = {
    component: PropTypes.func.isRequired,
    data: PropTypes.array,
};
