import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native'

function List(props) {
    const ComponentToRender = props.component;
    let content = <div />;

    // If we have items, render them
    if (props.items) {
        content = props.items.map(
            item =>
                props.array ? (
                    <ComponentToRender key={`item-${item[0].eid}`} item={item} />
                ) : (
                    <ComponentToRender key={`item-${item.eid}`} item={item} />
                ),
        );
    } else {
        // Otherwise render a single component
        content = <ComponentToRender />;
    }
    return (
        <View>{content}</View>

    )
}

List.propTypes = {
    component: PropTypes.func.isRequired,
    items: PropTypes.array,
    scroll: PropTypes.bool,
    array: PropTypes.bool,
};

export default List;