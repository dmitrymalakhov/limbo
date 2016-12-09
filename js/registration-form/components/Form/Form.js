'use strict';

import React, { PureComponent, PropTypes } from 'react';

export class Form extends PureComponent {
    static propTypes = {};
    static defaultProps = {};

    render() {
        return (
            <div className="form">
                {this.props.children}
            </div>
        );
    }
}
