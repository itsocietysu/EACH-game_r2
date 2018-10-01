import React, {Component} from 'react';
import {ScrollView, FlatList} from 'react-native';
import RenderFeedItem from "../containers/RenderFeedItem";

export default class ScrollList extends Component{
    render(){
        return (
            <ScrollView>
                <FlatList>
                    data={[]}
                    renderItem={({item})=>RenderFeedItem(item)}
                </FlatList>
            </ScrollView>
        )
    }
}