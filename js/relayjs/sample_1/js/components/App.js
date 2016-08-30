import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  state = {
    text: ''
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  },
});
