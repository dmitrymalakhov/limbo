import React from 'react';

import Button from '../component/Button';
import renderer from 'react-test-renderer';

jest.mock('react-dom');

describe('<Button/>', () => {
    it('renders correctly with default props', () => {
        const tree = renderer.create(
            <Button />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('renders correctly and call onClick if click', () => {
        const mockFn = jest.fn(),
            component = renderer.create(
                <Button onClick={mockFn}/>
            ),
            tree = component.toJSON();

        tree.props.onClick();

        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
