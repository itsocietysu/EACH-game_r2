import {FlatList} from 'react-native';
import React, {Component} from 'react';

export default class CustomList extends Component{

    render(){
        const array = this.props.array;
        const theme = this.props.theme;
        const RNComponent = this.props.component;
        const locale = this.props.locale;
        return(
            <FlatList
                data={array}
                renderItem={(item)=><RNComponent item={item} locale={locale} theme={theme}/>}
                keyExtractor={(item)=>array.indexOf(item)}
                extraData={theme}
            />
        );
    }
}
