import React from 'react';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import AdminActions from '.';

describe('AdminActions', () => {
  it('should match snapshot', () => {
    const onDelete = jest.fn();
    const onEditMode = jest.fn();
    expect(render(<AdminActions onDelete={onDelete} onEditMode={onEditMode} />).container).toMatchSnapshot();
  });

  it('should call functions when buttons are clicked', () => {
    const onDelete = jest.fn();
    const onEditMode = jest.fn();
    render(<AdminActions onDelete={onDelete} onEditMode={onEditMode} />);

    expect(onEditMode).toHaveBeenCalledTimes(0);
    user.click(screen.queryByTestId('editRow'));
    expect(onEditMode).toHaveBeenCalledTimes(1);

    expect(onDelete).toHaveBeenCalledTimes(0);
    user.click(screen.queryByTestId('deleteRow'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });
});
