import React from 'react';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import RenderAdminRow from '.';

describe('RenderAdminRow', () => {
  it('should match snapshot', () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onSelectOrDeselect = jest.fn();
    const tableRow = document.createElement('tbody');
    expect(
      render(
        <RenderAdminRow
          admin={{ id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false }}
          onDelete={onDelete}
          onEdit={onEdit}
          onSelectOrDeselect={onSelectOrDeselect}
        />,
        {
          container: document.body.appendChild(tableRow),
        }
      ).container
    ).toMatchSnapshot();
  });

  it('should display a row in editMode when editClicked', async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onSelectOrDeselect = jest.fn();
    const tableRow = document.createElement('tbody');
    render(
      <RenderAdminRow
        admin={{ id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false }}
        onDelete={onDelete}
        onEdit={onEdit}
        onSelectOrDeselect={onSelectOrDeselect}
      />,
      {
        container: document.body.appendChild(tableRow),
      }
    );
    expect(screen.queryAllByTestId('rowEditAction').length).toBe(0);
    await user.click(screen.queryByTestId('editRow'));
    expect(screen.queryAllByTestId('rowEditAction').length).toBe(1);
    expect(onEdit).toHaveBeenCalledTimes(0);
    await user.click(screen.queryByTestId('saveRow'));
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('should delete a row when delete clicked', async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onSelectOrDeselect = jest.fn();
    const tableRow = document.createElement('tbody');
    render(
      <RenderAdminRow
        admin={{ id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false }}
        onDelete={onDelete}
        onEdit={onEdit}
        onSelectOrDeselect={onSelectOrDeselect}
      />,
      {
        container: document.body.appendChild(tableRow),
      }
    );
    expect(onDelete).toHaveBeenCalledTimes(0);
    await user.click(screen.queryByTestId('deleteRow'));
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it('should display selected row as gray color background', async () => {
    const onDelete = jest.fn();
    const onEdit = jest.fn();
    const onSelectOrDeselect = jest.fn();
    const tableRow = document.createElement('tbody');
    render(
      <RenderAdminRow
        admin={{ id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: true }}
        onDelete={onDelete}
        onEdit={onEdit}
        onSelectOrDeselect={onSelectOrDeselect}
      />,
      {
        container: document.body.appendChild(tableRow),
      }
    );
    expect(screen.queryByTestId('tr')).toHaveClass('selectedRow');
  });
});
