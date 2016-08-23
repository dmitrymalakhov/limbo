import React from 'react';

class UserList extends React.Component {
  render() {
    return <div className='user-info'>
      <div className='user-id'>{this.props.user.id}</div>
      <div className='user-name'>{this.props.user.namename}</div>
    </div>;
  }
}