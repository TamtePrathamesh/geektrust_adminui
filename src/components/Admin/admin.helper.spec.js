/* eslint-disable no-undef */
import * as helper from './admin.helper';
import '@testing-library/jest-dom';

const consoleSpy = jest.spyOn(global.console, 'error').mockImplementation();

describe('admin.helper', () => {
  window.fetch = jest.fn();

  it('should return admin array', async () => {
    fetch.mockImplementation(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            { id: '1', name: 'xyz', email: 'an@g.c', role: 'member', selection: false },
            { id: '2', name: 'pqr', email: 'an@g.c', role: 'member', selection: false },
          ]),
      })
    );

    let response = await helper.getAdminList();
    expect(response).toEqual([
      {
        email: 'an@g.c',
        id: '1',
        name: 'xyz',
        role: 'member',
        selection: false,
      },
      {
        email: 'an@g.c',
        id: '2',
        name: 'pqr',
        role: 'member',
        selection: false,
      },
    ]);
  });

  it('should throw error when promise rejected', async () => {
    fetch.mockImplementation(() => Promise.reject('caught error'));
    try {
      await helper.getAdminList();
    } catch (error) {
      console.log(consoleSpy.mock.calls[0][0]);
      expect(consoleSpy.mock.calls[0][0]).toEqual('caught error');
    }
  });
});
