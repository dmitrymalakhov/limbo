import React, { Component } from 'react';

export default class ComponentItem extends React.Component {
  render() {
    return <div>{this.props.name}</div>;
  }
}