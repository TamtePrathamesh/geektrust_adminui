import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import VerticalGap from './index';

describe('VerticalGap', () => {
  it('should match snapshot', () => {
    const renderer = new ShallowRenderer();
    expect(renderer.render(<VerticalGap />)).toMatchSnapshot();
  });
  it('should match snapshot when given height', () => {
    const renderer = new ShallowRenderer();
    expect(renderer.render(<VerticalGap height="15" />)).toMatchSnapshot();
  });
});
