import React from 'react';
import {ScrollView, Text, FlatList} from 'react-native';
import PropTypes from 'prop-types';

export default function ScrollList(props) {
    const ComponentToRender = props.component;
    const locale = props.locale;
    const theme = props.theme;
    let content;
    if (props.data){
        const data = props.data;
        content =
            <FlatList
                data={data}
                renderItem={({item}) => <ComponentToRender item={item} locale={locale} theme={theme}/>}
                keyExtractor = {(item) => item.eid}
                extraData = {props}
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
