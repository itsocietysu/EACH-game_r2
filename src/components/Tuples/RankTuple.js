import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {withNavigation} from "react-navigation";
import styled from "styled-components/native";
import {FormattedMessage, FormattedWrapper} from "react-native-globalize";

import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import {createStructuredSelector} from "reselect";
import {makeSelectLanguage} from "../../redux/selectors/localesSelectors";
import {makeSelectTheme} from "../../redux/selectors/themeSelectors";

import messages from "../../Messages";
import {colors, fonts} from "../../utils/constants";
import {KeyText, ValueText} from "../../containers/styles";
import {tokenInfo} from "../../utils/tokenInfo";
import getUserGameData from "../../utils/getUserGameData";
import ChooseStatus from '../../utils/ChooseStatus';

const RowContainer = styled.View`
    flexDirection: row
`;

class RankTuple extends Component{
    state = {
        rank: null,
    };

    async componentWillMount(){
        await tokenInfo();
        const data = await getUserGameData();
        const bonus = data.gameData.bonus;
        const rank = ChooseStatus(bonus);
        this.setState({rank});
    }

    render() {
        let rank = <ActivityIndicator/>;
        if (this.state.rank)
            rank =
                <ValueText color={colors.MAIN} font={fonts.MURRAY} paddingLeft={12}>
                    <FormattedMessage message={this.state.rank}/>
                </ValueText>;
        const theme = this.props.theme;
        return (
            <FormattedWrapper locale={this.props.locale} messages={messages}>
                <RowContainer style={{flexDirection: 'row', width: '100%'}}>
                    <KeyText color={colors.TEXT[theme]} font={fonts.MURRAY}>
                        <FormattedMessage  message={'Rank'}/></KeyText>
                    <View style={{flex: 1}}>
                        {rank}
                    </View>
                </RowContainer>
            </FormattedWrapper>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLanguage(),
    theme: makeSelectTheme(),
});

const withConnect = connect(
    mapStateToProps,
    {},
);

export default compose(
    withConnect,
    withNavigation
)(RankTuple);


