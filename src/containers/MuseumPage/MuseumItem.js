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

import {TextContainer, TittleText, DescriptionText, BasicText, SpamHello} from "../styles";
import {makeSelectLanguage} from "../Locales/selectors";
import CustomList from "../../components/CustomList";
import LocationItem from "../../components/LocationItem";
import GameItem from "../GamePage/GameItem";
import messages from "../../Messages";

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
        height: 50,
        backgroundColor: '#ffa366',
        alignItems: 'center',
        justifyContent: 'center'
    },
};

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
        const arrow = (this.state.isAtBottom)? require("../../../assets/images/arrowUp.png") : require("../../../assets/images/arrowDown.png");
        return(
            <FormattedWrapper locale={this.props.language} messages={messages} >
                <View>
                    <ScrollView>
                        <ImageBackground source={{uri: item.image}}
                                         style={{width: width, height: width}}>
                            <TextContainer>
                                <TittleText color={'#ffffff'}>{item.name[locale]}</TittleText>
                            </TextContainer>

                        </ImageBackground>
                        <View>
                            <CustomList component={LocationItem} array={item.location} locale={locale}/>
                        </View>
                        <TextContainer>
                            <Text>{item.desc[locale]}</Text>
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
                                <View style={styles.panelHeader}>
                                    <Image source={arrow} style={{width: 80, height: 20}}/>
                                    <Text style={{color: '#FFF'}}><FormattedMessage message={'Games'}/></Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{flex:1}}>
                                <GameItem museumID={item.eid}/>
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
});
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(withConnect)(MuseumItemScreen);
