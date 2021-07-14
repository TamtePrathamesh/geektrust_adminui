import React from 'react';
import { render } from '@testing-library/react';
import WithBoundary from '.';

const ErrorComp = () => {
  throw new Error('Test comp');
};

const FineComp = () => 'Fine';

describe('withBoundary', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation();
    console.error.mockClear();
  });

  it('should match snapshot', () => {
    const Comp = WithBoundary(ErrorComp);
    expect(render(<Comp />).container).toMatchSnapshot();
    expect(console.error).toBeCalled();
  });

  it('should do nothing if there is no error', () => {
    const Comp = WithBoundary(FineComp);
    expect(render(<Comp />).container).toMatchSnapshot();
    expect(console.error).not.toBeCalled();
  });
});
