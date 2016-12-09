import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux'

import { Form } from '../Form/Form';
import { Input } from '../Input/Input';

import { getMostRelevantProfession } from '../../actions/app';

class App extends PureComponent {
    static propTypes = {
        currentProfession: PropTypes.string,
        onGetMostRelevantProfession: PropTypes.func
    };

    handleChangeProfession = (v) => {
        this.props.onGetMostRelevantProfession(v);
    }

    render() {
        return (
            <Form>
                <Input
                    value={this.props.currentProfession} onChange={this.handleChangeProfession}
                />
            </Form>
        );
    }
}

App.displayName = 'App';

const mapStateToProps = ({ app }) => ({
    currentProfession: app.currentProfession
});

const mapDispatchToProps = dispatch => ({
    onGetMostRelevantProfession: query => void dispatch(getMostRelevantProfession(query))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
