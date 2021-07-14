import React from 'react';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import SearchAdmin from '.';

describe('SearchAdmin', () => {
  it('should match snapshot', () => {
    const onFilter = jest.fn();
    expect(render(<SearchAdmin onFilter={onFilter} />).container).toMatchSnapshot();
  });

  it('should call filter on input text changed', () => {
    const onFilter = jest.fn();
    render(<SearchAdmin onFilter={onFilter} />);
    expect(onFilter).toHaveBeenCalledTimes(0);
    user.type(screen.queryByTestId('search'), 'admin');
    expect(onFilter).not.toHaveBeenCalledTimes(0);
  });
});
