/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from "styled-components/native";
import {View, Text, Dimensions, PixelRatio} from 'react-native';
import {colors, SCREEN_HEIGHT} from "../utils/constants";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
const {width, height} = Dimensions.get('window');

export const TabBarLabelText = styled.Text`
    textAlign: center
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${wp('4.5%')}
`;

/*
 * News and Museums Feed
 */
export const FeedTittleText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${wp('5%')}
`;

export const FeedDescriptionText = styled.Text`
    color: ${props=>props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${wp('4.5%')}
`;

export const FeedPlainText = styled.Text`
    color: ${props=>props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${wp('4.5')}
    textAlign: justify
`;

export const FeedMoreText = styled.Text`
    alignSelf: center
    color: #0000ff
    fontFamily: ${props=> props.font}
    fontSize: ${wp('4.5%')}
`;

/*
 * Museum item
 */
export const MuseumItemPanelHeader = styled.View`
    height: ${props=> props.height}
    backgroundColor: ${props => props.color}
    alignItems: center
    justifyContent: center
`;

export const MuseumItemPanelText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${0.28/10.5*height}
`;

export const MarkText = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${0.28/10.5*height}
`;

export const GameTitleText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${0.3/10.5*height}
`;
/*
 * Quests
 */
export const QuestButtonText = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: ${wp('4.5%')}
`;

/*
 * Quest Info
 */
export const QuestTittle = styled.Text`
    alignSelf: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: ${0.5/10.5*height}
    paddingTop: 10
    paddingBottom: 5
`;

export const RatingText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    paddingLeft: ${props => props.paddingLeft || 0}
    fontSize: ${wp('4.5%')}
`;

export const TimeText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    paddingLeft: ${props => props.paddingLeft || 0}
    fontSize: ${wp('4.5%')}
`;

/*
 * Final screen
 */
export const FinishTitleText = styled.Text`
    textAlign: center
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: ${0.5/10.5*height}
`;

export const ValueText = styled.Text`
    flex: 1
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    paddingLeft: ${props => props.paddingLeft || 0}
    fontSize: ${0.45/10.5*height}
    textAlign: right
`;

export const KeyText = styled.Text`
    alignSelf: flex-end
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    paddingLeft: ${props => props.paddingLeft || 0}
    fontSize: ${0.45/10.5*height}
`;

export const CommentTextInput = styled.TextInput`
    fontFamily: ${props => props.font}
    color: ${props => props.color}
    fontSize: ${0.35/10.5*height}
    textAlign: center
    width: 95%
    height: ${1.2/10.5*height}
    borderColor: ${props => props.color}
    borderWidth: 2
`;


/*
 * Pop-up dialog
 */
export const PopUpTittleText = styled.Text`
   color: ${props => props.color}
   fontFamily: ${props => props.font}
   fontSize: ${0.45/10.5*height}     
`;

export const PopUpContentText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props => props.font}
    fontSize: ${0.32/10.5*height}
`;

/*
 * Settings screen
 */
export const SettingsText = styled.Text`
    fontSize: ${0.45/10.5*height}
    fontFamily: ${props => props.font}
    color: ${props => props.color}
`;
export const SettingsTitleText = styled.Text`
    fontSize: ${0.50/10.5*height}
    fontFamily: ${props => props.font}
    color: ${props => props.color}
`;
export const SettingsAddText = styled.Text`
    fontSize: ${0.35/10.5*height}
    fontFamily: ${props => props.font}
    color: ${props => props.color}
`;
export const SettingsContainer = styled.View`
    height: 12%
    flexDirection: row
    alignItems: center
`;

/*
 * Map
 */
export const MapText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${0.3/10.5*height}
    textAlign: center 
`;

/*
 * Bonus
 */
export const BonusText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${0.3/10.5*height}
    textAlign: center 
`;







export const TextContainer = styled.View`
    flex: 1
    paddingLeft: ${width*0.03} 
    paddingRight: ${width*0.03}
    paddingBottom: 5px
`;

export const DescriptionText = styled.Text`
    color: ${props=>props.color}
    fontSize: 18px
    textAlign: justify
`;

export const BasicText = styled.Text`
    color: ${props=>props.color}
    fontSize: 16px
`;

export const ButtonText = styled.Text`
    color: ${props=>props.color}
    fontStyle: italic
    fontWeight: bold
    fontSize: 16px 
`;

export const StyledButton = styled.View`
    backgroundColor: ${props => props.color}
    height: 50px
    width: ${width/2}
    alignItems: center
    justifyContent: center
`;

export const AnswerText = styled.Text`
    fontSize: 20px
    paddingLeft: 10px
    textAlign: center
    color: ${props => props.color}
`;

export const AnswerContainer = styled.View`
    flex: 1
    flexDirection: row
    backgroundColor: ${props => props.color}
    borderWidth: 1
    borderColor: ${colors.SECOND.light}
    height: 50px
    width: ${width*7/8}
    justifyContent: center
    alignItems: center
`;

export const CentroidFigure = styled.View`
    justifyContent: center
    alignItems: center
`;

export const TittleText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${0.3/10.5*height}
`;

export const TittleContainer = styled.View`
    flex: 1
    paddingLeft: 5
    justifyContent: center
`;

export const LogoAvatar = styled.Image`
    width: 40
    height: 40
    borderRadius: 20
    borderWidth: 1
    resizeMode: cover
    borderColor: ${props => props.borderColor}   
`;

export const HeaderContainer = styled.View`
    flex: 0.15
    flexDirection: row
    backgroundColor: ${props => props.bgColor}
    paddingLeft: 4
    paddingBottom: 4
    paddingTop: 2
    paddingRight: 2
`;

export const ImageMask = styled.View`
    position: absolute
    backgroundColor: rgba(160,160,160,0.5)
    height: ${props => props.height}
    width: ${props => props.width}
`;

export const MainTextContainer = styled.View`
    flex: 1
    backgroundColor: ${props => props.bgColor}
    width: ${props => props.width || '100%'}
    height: ${props => props.height || '100%'}
    paddingLeft: 8
    paddingBottom: 10
    paddingRight: 8
    paddingTop: 5
`;

export const MainText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${0.3/10.5*height}
`;

export const LocationText = styled.Text`
    color: ${props=> props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${0.25/10.5*height}
    alignSelf: flex-end
`;
export const MoreText = styled.Text`
    alignSelf: center
    color: #0000ff
    fontFamily: ${props=> props.font}
`;

export const Rectangle = styled.View`
    width: ${props => props.width}
    height: ${props => props.height}
    backgroundColor:  ${props=> props.backgroundColor || 'transparent'}
`;

/*
 * Messages
 */
export const  ErrMessageText = styled.Text`
    color: ${props => props.color}
    fontFamily: ${props=> props.font}
    fontSize: ${wp('6%')} 
`;

export class SpamHello extends React.Component {
    render() {
        return (
            <View>
                <Text>Hell_START</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hello World</Text>
                <Text>Hell</Text>
                <Text>Hell</Text>
                <Text>Hell_FINISH</Text>
            </View>
        );
    }
}