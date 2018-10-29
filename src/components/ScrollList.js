import React from 'react';
import {ScrollView, Text, FlatList} from 'react-native';
import PropTypes from 'prop-types';

export default function ScrollList(props) {
    const ComponentToRender = props.component;
    const locale = props.locale;
    let content;
    if (props.data){
        const data = props.data;
        // const k = componentToRender(data[0]);
        content =
            <FlatList
                data={data}
                renderItem={({item}) => <ComponentToRender item={item} locale={locale}/>}
                keyExtractor = {(item) => item.eid}
                extraData = {props.locale}
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
