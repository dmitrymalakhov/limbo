import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ProxyIFrame extends Component {
  static propTypes = {
    frameProps: React.PropTypes.object,
    src: React.PropTypes.string
  };

  static defaultProps = {
    frameProps: {
      frameBorder: 1
    },
    src: ''
  };

  componentDidMount() {
    let iframe = ReactDOM.findDOMNode(this);

    iframe.onload = () => {
      let frameBody = iframe.contentDocument.body,
          el = document.createElement('div');

      frameBody.appendChild(el);
      this.el = el;

      this._updateIFrameContents();
    }
    
  }

  componentDidUpdate() {
    this._updateIFrameContents();
  }

  _updateIFrameContents() {
    ReactDOM.render(this.props.children, this.el);
  }

  render() {
    return (
      <iframe {...this.props} />
    );
  }
}
