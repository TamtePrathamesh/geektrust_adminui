import React from 'react';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import DeleteSelected from '.';

describe('DeleteSelected', () => {
  it('should match snapshot', () => {
    const deleteFunc = jest.fn();
    expect(render(<DeleteSelected deleteSelected={deleteFunc} />).container).toMatchSnapshot();
  });

  it('should call function when button clicked', () => {
    const deleteFunc = jest.fn();
    render(<DeleteSelected deleteSelected={deleteFunc} />);
    expect(deleteFunc).toHaveBeenCalledTimes(0);
    user.click(screen.queryByTestId('deleteSelected'));
    expect(deleteFunc).toHaveBeenCalledTimes(1);
  });
});
