import React, {Component} from 'react';
import {
    ImageBackground,
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native';
import connect from "react-redux/es/connect/connect";
import {createStructuredSelector} from "reselect";
import {compose} from 'redux';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';

import {TittleContainer, FeedTittleText, HeaderContainer, MuseumItemPanelHeader, MuseumItemPanelText, MainTextContainer, FeedPlainText, Rectangle} from "../styles";
import {makeSelectLanguage} from "../../components/Locales/selectors";
import CustomList from "../../components/CustomList";
import LocationItem from "../../components/LocationItem";
import GameItem from "../GamePage/GameItem";
import messages from "../../Messages";
import {makeSelectTheme} from "../../components/Theme/selectors";
import {
    ARROW_IMG_HEIGHT,
    ARROW_IMG_WIDTH,
    colors,
    fonts,
    HeaderHeight,
    SlidingPanelHeight,
    StatusBarHeight,
    TabBarHeight
} from "../../utils/constants";
import styled from 'styled-components/native';
import getFont from "../../utils/getFont";
import {makeSelectFonts} from "../../components/Fonts/selectors";


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

class MuseumItemScreen extends Component{
    static defaultProps = {
        draggableRange: {
            top: height,
            bottom: HeaderHeight + TabBarHeight + SlidingPanelHeight + StatusBarHeight,
        },
    };

    state={
        startDragPos: HeaderHeight + TabBarHeight + SlidingPanelHeight + StatusBarHeight,
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
        const locale = this.props.locale.toUpperCase();
        const width = Dimensions.get('window').width;
        const theme = this.props.theme;
        const fontLoaded = this.props.font;
        const arrow = (this.state.isAtBottom)? require("../../../assets/images/arrowUp.png") : require("../../../assets/images/arrowDown.png");
        return(
            <FormattedWrapper locale={this.props.locale} messages={messages} >
                <View style={{height: '100%', backgroundColor: colors.BASE[theme]}}>
                    <ScrollView >
                        <HeaderContainer bgColor={colors.BASE[theme]}>
                            <TittleContainer>
                                <FeedTittleText  color={colors.TEXT[theme]}
                                             font={getFont(fontLoaded, fonts.EACH)}
                                >
                                    {item.name[locale]}
                                </FeedTittleText>
                            </TittleContainer>
                        </HeaderContainer>
                      <ImageBackground source={{uri: item.image}}
                                         style={{width: width, height: width}}/>
                        <CustomList component={LocationItem} array={item.location} theme={theme}/>

                        <MainTextContainer bgColor={colors.BASE[theme]} width={width}>
                            <FeedPlainText color={colors.TEXT[theme]}
                                      font={getFont(fontLoaded, fonts.MURRAY)}
                            >
                                {item.desc[locale]}
                            </FeedPlainText>
                        </MainTextContainer>
                        {/* blank view for drawer*/}
                        <Rectangle width={width} height={70}/>
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
                            <TouchableOpacity activeOpacity={0.9} onPress={()=>this._onTapSlidingPanel(this._panel)}>
                                <MuseumItemPanelHeader color={colors.MAIN} height={SlidingPanelHeight}>
                                    <Image source={arrow} style={{width: ARROW_IMG_WIDTH, height: ARROW_IMG_HEIGHT}}/>
                                    <MuseumItemPanelText color={'#fff'} font={getFont(fontLoaded, fonts.EACH)}><FormattedMessage message={'Games'}/></MuseumItemPanelText>
                                </MuseumItemPanelHeader>
                            </TouchableOpacity>
                            <View style={{flex:1, backgroundColor: colors.BASE[theme]}}>
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
    locale: makeSelectLanguage(),
    theme: makeSelectTheme(),
    font: makeSelectFonts(),
});
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);
export default compose(withConnect)(MuseumItemScreen);
