import React from 'react';
import { screen, render } from '@testing-library/react';
import user from '@testing-library/user-event';
import AdminList from '.';

const admins = [
  { id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false },
  { id: '2', name: 'pqr', email: 'an@g.c', role: 'member', selection: false },
];

describe('AdminList', () => {
  it('should match snapshot', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onSelectOrDeselectAll = jest.fn();
    const onSelectOrDeselect = jest.fn();
    expect(
      render(
        <AdminList
          adminList={admins}
          filter=""
          onDelete={onDelete}
          onEdit={onEdit}
          onSelectOrDeselect={onSelectOrDeselect}
          onSelectOrDeselectAll={onSelectOrDeselectAll}
        />
      ).container
    ).toMatchSnapshot();
  });

  it('should display only one row when filter is given as name', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onSelectOrDeselectAll = jest.fn();
    const onSelectOrDeselect = jest.fn();
    expect(
      render(
        <AdminList
          adminList={admins}
          filter="xyz"
          onDelete={onDelete}
          onEdit={onEdit}
          onSelectOrDeselect={onSelectOrDeselect}
          onSelectOrDeselectAll={onSelectOrDeselectAll}
        />
      ).container
    ).toMatchSnapshot();
  });

  it('should select all row when selectAllRow checkbox clicked', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn();
    const onSelectOrDeselectAll = jest.fn(() => admins.map((i) => ({ ...i, selection: true })));
    const onSelectOrDeselect = jest.fn();

    render(
      <AdminList
        adminList={admins}
        filter=""
        onDelete={onDelete}
        onEdit={onEdit}
        onSelectOrDeselect={onSelectOrDeselect}
        onSelectOrDeselectAll={onSelectOrDeselectAll}
      />
    );
    expect(onSelectOrDeselectAll).toHaveBeenCalledTimes(0);
    user.click(screen.queryByTestId('selectAll'));
    expect(onSelectOrDeselectAll).toHaveBeenCalledTimes(1);
  });

  it('should call delete when button is clicked', () => {
    const onEdit = jest.fn();
    const onDelete = jest.fn((id) => admins.filter((i) => i.id !== id));
    const onSelectOrDeselectAll = jest.fn(() => admins.map((i) => ({ ...i, selection: true })));
    const onSelectOrDeselect = jest.fn();
    const { rerender } = render(
      <AdminList
        adminList={admins}
        filter=""
        onDelete={onDelete}
        onEdit={onEdit}
        onSelectOrDeselect={onSelectOrDeselect}
        onSelectOrDeselectAll={onSelectOrDeselectAll}
      />
    );

    expect(onDelete).toHaveBeenCalledTimes(0);
    user.click(screen.queryAllByTestId('deleteRow')[0]);
    expect(onDelete).toHaveBeenCalledTimes(1);
    rerender(
      <AdminList
        adminList={admins}
        filter=""
        onDelete={onDelete}
        onEdit={onEdit}
        onSelectOrDeselect={onSelectOrDeselect}
        onSelectOrDeselectAll={onSelectOrDeselectAll}
      />
    );
  });
});
