import React, {Component} from 'react';
import {
    ImageBackground,
    View,
    ScrollView,
    Text,
    Button,
    TouchableOpacity,
    WebView,
    Dimensions,
    Animated,
    Image
} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {compose} from 'redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';
import {NavigationEvents} from 'react-navigation';

import {TextContainer, TittleText, DescriptionText, BasicText, SpamHello} from "../styles";
import {makeSelectLanguage} from "../../components/Locales/selectors";
import CustomList from "../../components/CustomList";
import LocationItem from "../../components/LocationItem";
import GameItem from "../GamePage/GameItem";
import messages from "../../Messages";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {colors} from "../../utils/constants";
import styled from 'styled-components/native';


const {height} = Dimensions.get('window');

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center'
    },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        // position: 'relative'
    },
    panelHeader: {

    },
};
const PanelHeader = styled.View`
    height: 50
    backgroundColor: ${props => props.color}
    alignItems: center
    justifyContent: center
`;

class MuseumItemScreen extends Component{
    static defaultProps = {
        draggableRange: {
            top: height,
            bottom: 185,
        },
    };

    state={
        startDragPos: 185,
        allowDragging: true,
        isAtBottom: true,
    };

    _handleOnDragEnd(position, panel, startDragPos) {
        const top = this.props.draggableRange.top;
        const bottom = this.props.draggableRange.bottom;
        if (position - startDragPos >= 0) {
            panel.transitionTo(top);
            this.setState({isAtBottom: false});
        } else {
            panel.transitionTo(bottom);
            this.setState({isAtBottom: true});
        }
    }

    _handleOnDragStart(position, it){
        it.setState({startDragPos: position});
    }

    // TODO: optimize function (or remove)
    _onTapSlidingPanel(panel){
        const top = this.props.draggableRange.top;
        const bottom = this.props.draggableRange.bottom;
        if (this.state.isAtBottom)
        {
            panel.transitionTo(top);
            this.setState({isAtBottom: false})
        }
        else
        {
            panel.transitionTo(bottom);
            this.setState({isAtBottom: true})
        }

    }

    render(){
        const navigation = this.props.navigation;
        const item = navigation.getParam('data', ''); // second parameter is some default value
        const locale = this.props.language.toUpperCase();
        const width = Dimensions.get('window').width;
        const theme = this.props.theme;
        const arrow = (this.state.isAtBottom)? require("../../../assets/images/arrowUp.png") : require("../../../assets/images/arrowDown.png");
        return(
            <FormattedWrapper locale={this.props.language} messages={messages} >
                <View style={{backgroundColor: colors.BASE[theme]}}>
                    <NavigationEvents
                      onWillBlur={() => navigation.navigate('Museums')}
                    />
                    <ScrollView>
                        <View style={{paddingBottom: 5}}>

                            <TittleText color={colors.TEXT[theme]}>{item.name[locale]}</TittleText>
                        </View>
                        <ImageBackground source={{uri: item.image}}
                                         style={{width: width, height: width}}/>
                        <View>
                            <CustomList component={LocationItem} array={item.location} locale={locale} theme={theme}/>
                        </View>
                        <TextContainer>
                            <Text style={{color: colors.TEXT[theme]}}>{item.desc[locale]}</Text>
                        </TextContainer>
                        {/* blank view for drawer*/}
                        <View style={{width: width, height: 70, /* backgroundColor: '#ff0000'*/}}/>
                    </ScrollView>
                    <SlidingUpPanel
                        ref={c => this._panel = c}
                        visible
                        startCollapsed
                        allowMomentum={false}
                        showBackdrop={false}
                        onDragStart = {(position)=>{this._handleOnDragStart(position,this)}}
                        onDragEnd={(position)=>{this._handleOnDragEnd(position, this._panel, this.state.startDragPos)}}
                        draggableRange={this.props.draggableRange}
                    >
                        <View style={styles.panel}>
                            <TouchableOpacity onPress={()=>this._onTapSlidingPanel(this._panel)}>
                                <PanelHeader color={'#5b7bbc'}>
                                    <Image source={arrow} style={{width: 80, height: 20}}/>
                                    <Text style={{color: '#FFF'}}><FormattedMessage message={'Games'}/></Text>
                                </PanelHeader>
                            </TouchableOpacity>
                            <View style={{flex:1, backgroundColor: colors.BASE[theme]}}>
                                <GameItem museumID={item.eid} theme={theme}/>
                            </View>
                        </View>
                    </SlidingUpPanel>
                </View>
            </FormattedWrapper>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {}
}

const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
});
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(withConnect)(MuseumItemScreen);
