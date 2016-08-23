import React from 'react';

class UserApp extends React.Component {
  render() {
    return <div className='user-app'>
      <div>USER LIST</div>
      <div>{this.props.children}</div>
    </div>;
  }
}

export default UserApp;