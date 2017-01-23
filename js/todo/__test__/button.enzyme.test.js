import React, { Component } from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import Button from '../component/Button';

describe('<Button/>', () => {
    it('renders correctly with default props', () => {
        const wrapper = mount(
             <Button />
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
  }
);
