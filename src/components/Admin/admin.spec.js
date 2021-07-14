import React from 'react';
import { render, waitFor, screen, act } from '@testing-library/react';
import user from '@testing-library/user-event';
import * as helper from './admin.helper';
import Admin from '.';

jest.mock('./admin.helper', () => ({
  getAdminList: jest.fn(() => Promise.resolve([])),
}));

describe('Admin', () => {
  it('should match snapshot', async () => {
    helper.getAdminList.mockImplementation(() =>
      Promise.resolve([
        { id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false },
        { id: '2', name: 'pqr', email: 'an@g.c', role: 'member', selection: false },
      ])
    );
    const { container } = render(<Admin />);
    await waitFor(() => expect(helper.getAdminList).toHaveBeenCalledTimes(1));
    expect(container).toMatchSnapshot();
  });

  it('should display the data', async () => {
    helper.getAdminList.mockClear();
    helper.getAdminList.mockImplementation(() =>
      Promise.resolve([
        { id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false },
        { id: '2', name: 'pqr', email: 'an@g.c', role: 'member', selection: false },
      ])
    );
    const { container } = render(<Admin />);
    await waitFor(() => expect(helper.getAdminList).toHaveBeenCalledTimes(1));
    expect(container).toMatchSnapshot();
  });

  it('should delete the Row from data when row delete button clicked', async () => {
    helper.getAdminList.mockClear();
    helper.getAdminList.mockImplementation(() =>
      Promise.resolve([
        { id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false },
        { id: '2', name: 'pqr', email: 'an@g.c', role: 'member', selection: false },
      ])
    );
    render(<Admin />);
    await waitFor(() => expect(helper.getAdminList).toHaveBeenCalledTimes(1));
    expect(screen.queryAllByText('xyz').length).toBe(1);
    user.click(screen.queryAllByTestId('deleteRow')[0]);
    expect(screen.queryAllByText('xyz').length).toBe(0);
  });

  it('should selectAll Rows when select all clicked', async () => {
    helper.getAdminList.mockClear();
    helper.getAdminList.mockImplementation(() =>
      Promise.resolve([
        { id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false },
        { id: '2', name: 'pqr', email: 'an@g.c', role: 'member', selection: false },
      ])
    );
    const { rerender, container } = render(<Admin />);
    await waitFor(() => expect(helper.getAdminList).toHaveBeenCalledTimes(1));
    expect(container.querySelectorAll('tr[class=selectedRow]').length).toBe(0);
    user.click(screen.queryAllByTestId('selectAll')[0]);
    rerender(<Admin />);
    expect(container.querySelectorAll('tr[class=selectedRow]').length).toBe(2);
  });

  it('should delete all selected row when deleteSelected button clicked', async () => {
    helper.getAdminList.mockClear();
    helper.getAdminList.mockImplementation(() =>
      Promise.resolve([
        { id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false },
        { id: '2', name: 'pqr', email: 'an@g.c', role: 'member', selection: false },
      ])
    );
    const { rerender, container } = render(<Admin />);
    await waitFor(() => expect(helper.getAdminList).toHaveBeenCalledTimes(1));
    expect(container.querySelectorAll('tr[class=selectedRow]').length).toBe(0);
    act(() => {
      user.click(screen.queryAllByTestId('selectAll')[0]);
    });
    rerender(<Admin />);
    expect(container.querySelectorAll('tr[class=selectedRow]').length).toBe(2);
    act(() => {
      user.click(screen.queryByTestId('deleteSelected'));
    });
    await waitFor(() => expect(container.querySelectorAll('tr[class=selectedRow]').length).toBe(0));
  });

  it('should save edited row data', async () => {
    helper.getAdminList.mockClear();
    helper.getAdminList.mockImplementation(() =>
      Promise.resolve([
        { id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false },
        { id: '2', name: 'pqr', email: 'an@g.c', role: 'member', selection: false },
      ])
    );
    const { container } = render(<Admin />);
    await waitFor(() => expect(helper.getAdminList).toHaveBeenCalledTimes(1));
    expect(screen.queryAllByText('member').length).toBe(2);
    await user.click(screen.queryAllByTestId('editRow')[0]);
    await user.type(container.querySelector('input[value=member]'), 'admin');
    await user.click(screen.queryByTestId('saveRow'));
    expect(screen.queryAllByText('member').length).toBe(1);
  });
});
