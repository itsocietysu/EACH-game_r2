import {FlatList} from 'react-native';
import React, {Component} from 'react';

export default class CustomList extends Component{

    render(){
        const array = this.props.array;
        const theme = this.props.theme;
        const RNComponent = this.props.component;
        return(
            <FlatList
                data={array}
                renderItem={(item)=><RNComponent item={item}/>}
                keyExtractor={(item)=>array.indexOf(item).toString()}
                extraData={theme}
            />
        );
    }
}
