import React, {Component} from 'react';
import {BottomTabBar, withNavigation} from 'react-navigation';
import connect from "react-redux/es/connect/connect";
import {compose} from "redux";
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";

import {makeSelectLanguage} from "./Locales/selectors";
import {makeSelectTheme} from "./Theme/selectors";
import {colors} from "../utils/constants";

class CustomTabBar extends Component{
    render(){
        const theme = this.props.theme;
        const newProps = Object.assign(
            { },
            this.props,
            {
                style: {
                    backgroundColor: colors.BASE[theme],
                    height: 50,
                },
                activeTintColor: colors.SECOND[theme],
                inactiveTintColor: colors.TEXT[theme],
            },
        );
        return <BottomTabBar {...newProps} />
    }
}

CustomTabBar.propTypes = {
    theme: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
    language: makeSelectLanguage(),
    theme: makeSelectTheme(),
});

const withConnect = connect(mapStateToProps, {});

export default compose(withNavigation, withConnect)(CustomTabBar);
