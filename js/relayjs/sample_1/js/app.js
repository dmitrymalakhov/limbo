import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

const mountNode = document.getElementById('root');

class Product extends React.Component {
  render() {
    var {name, steepingTime, externalInfo} = this.props.product;

    return (
      <li key={name}>
        {name} (<em>{steepingTime} min</em>) cost {externalInfo.price}
      </li>
    );
  }
}

class ProductStore extends React.Component {
  render() {
    return <ul>
      {this.props.store.products.map(
        product => <div>
          <Product product={product} />
        </div>
      )}
    </ul>;
  }
}

Product = Relay.createContainer(Product, {
  fragments: {
    product: () => Relay.QL`
      fragment on Product {
        name,
        steepingTime,
        externalInfo {
          price
        }
      }
    `,
  },
});

ProductStore = Relay.createContainer(ProductStore, {
  fragments: {
    store: () => Relay.QL`
      fragment on Store {
        products { ${Product.getFragment('product')} },
      }
    `,
  },
});

class ProductHomeRoute extends Relay.Route {
  static routeName = 'Home';
  static queries = {
    store: (Component) => Relay.QL`
      query {
        store { ${Component.getFragment('store')} },
      }
    `,
  };
}

ReactDOM.render(
  <Relay.RootContainer
    Component={ProductStore}
    route={new ProductHomeRoute()}
  />,
  mountNode
);