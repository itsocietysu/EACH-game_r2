import React, {Component} from 'react';
import {View, Text, Button, Image, Dimensions} from 'react-native';
import {withNavigation} from 'react-navigation'
import {createStructuredSelector} from "reselect";
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";

import {makeSelectLanguage} from "../containers/Locales/selectors";

class QuestInfoScreen extends  Component {
    render(){
        const width = Dimensions.get('window').width;
        const navigation = this.props.navigation;
        const locale = this.props.language.toUpperCase();
        const quest = navigation.getParam('quest', '');
        const scenarioID = quest.scenario[0].eid;
        return(
            <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Quest Info</Text>
                <Text>{quest.name[locale]}</Text>
                <Image source={{uri: quest.image}} style={{width: width, height: width}}/>
                <Text>{quest.desc[locale]}</Text>
                <Text>{quest.scenario[0].eid}</Text>
                <Button onPress={()=>this.props.navigation.navigate('QuestPlay', {scenarioID: scenarioID})}
                        title='Play'
                        color='#ffa366'/>
            </View>
        )
    }
}
export function mapDispatchToProps(dispatch) {
    return {}
}

const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
});
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(withConnect, withNavigation)(QuestInfoScreen);
