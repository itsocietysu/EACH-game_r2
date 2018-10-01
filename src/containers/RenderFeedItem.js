import {ImageBackground, View, Text} from 'react-native'
import React from 'react';
import PropTypes from 'prop-types';
// import { withRouter } from 'react-router-dom';
// import { FormattedMessage } from 'react-intl';

// import { getLocale } from 'cookieManager';

import ListItem from './../components/ListItem';

// import './hoverContainer.css';

// import { DEFAULT_LOCALE } from '../../i18n';

const ItemDiv = (item, history) => {
    // const locale = getLocale() || DEFAULT_LOCALE;
    return (
        <ImageBackground source={{uri: item.image}}
                         style={{width: 400, height: 400}}>
            <View>
                <Text>{item.title["RU"]}</Text>
                <Text>{item.desc["EN"]}</Text>
            </View>
        </ImageBackground>
    );
};

export class RenderFeedItem extends React.PureComponent {
    render() {
        const { item } = this.props;

        // Put together the content of the feed
        const content = (
            <View>
                {ItemDiv(item[0], this.props.history)}
            </View>
        );

        // Render the content into a list item
        return <ListItem key={`feed-list-item-${item.eid}`} item={content} />;
    }
}

RenderFeedItem.propTypes = {
    item: PropTypes.array,
    history: PropTypes.object,
};

export default RenderFeedItem;

