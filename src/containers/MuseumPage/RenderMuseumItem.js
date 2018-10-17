import {ImageBackground, View, Text, TouchableOpacity, Dimensions} from 'react-native'
import styled from 'styled-components/native';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';

// import { getLocale } from 'cookieManager';

import ListItem from '../../components/ListItem';

// import './hoverContainer.css';

// import { DEFAULT_LOCALE } from '../../i18n';


const TextContainer = styled.View`
    flex: 1
    alignItems: ${({ align }) => align || 'center'};
`;

const TittleText = styled.Text`
    color: 'rgb(255,255,255)'
    flex: 1
    fontSize: 20px
    fontWeight: bold
`;

const DescriptionText = styled.Text`
    color: 'rgb(255,255,255)'
    fontSize: 14px
    flex: 1
`;

class RenderMuseumItem extends Component{

    // Render the content into a list item
    render() {
        const item = this.props.item;
        const width = Dimensions.get('window').width;
        return (
            <View style={{flex: 1}}>
                <ImageBackground source={{uri: item.image}}
                             style={{width: width, height: width}}>
                    <TextContainer>
                        <TittleText>{item.name["RU"]}</TittleText>
                    </TextContainer>
                    <TextContainer>
                        <DescriptionText>{item.desc["RU"]}</DescriptionText>
                    </TextContainer>
                    {/* <TextContainer>
                        <DescriptionText>{item.location}</DescriptionText>
                    </TextContainer>
                    <TextContainer>
                        <DescriptionText>{item.game}</DescriptionText>
                    </TextContainer> */}
                </ImageBackground>
            </View>
        );
    }
}

export {RenderMuseumItem};
