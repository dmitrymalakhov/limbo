'use strict';

import React, { PureComponent, PropTypes } from 'react';

export class Input extends PureComponent {
    static propTypes = {
        value: PropTypes.string
    };
    static defaultProps = {
        value: ""
    };

    render() {
        return (
            <input
                value={this.props.value}
            />
        );
    }
}
