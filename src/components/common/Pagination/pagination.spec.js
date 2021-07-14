import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { screen, render, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import Pagination from '.';

describe('Pagination', () => {
  it('should match snapshot', () => {
    const renderer = new ShallowRenderer();
    expect(renderer.render(<Pagination />)).toMatchSnapshot();
  });

  it('should create no of pages as per pageCount', () => {
    const pageChange = jest.fn();
    expect(render(<Pagination pageCount={2} currentPage={1} onPageChange={pageChange} />).container).toMatchSnapshot();
  });

  it('should disable next and previous button when either at beginning of page or at end of page', () => {
    const pageChange = jest.fn();
    render(<Pagination pageCount={3} currentPage={1} onPageChange={pageChange} />);
    expect(screen.queryByTestId('previous')).toHaveClass('disableClick');
    expect(screen.queryByTestId('next')).not.toHaveClass('disableClick');
    user.click(screen.queryByText('3'));
    expect(screen.queryByTestId('next')).toHaveClass('disableClick');
  });

  it('should take either on first or last page directly when leading and trailing button clicked', async () => {
    const pageChange = jest.fn();
    let currentPage = 2;
    const { rerender } = render(<Pagination pageCount={3} currentPage={currentPage} onPageChange={pageChange} />);
    expect(screen.queryByText(1)).not.toHaveClass('active');
    await user.click(screen.queryByTestId('trailing'));
    currentPage = 1;
    rerender(<Pagination pageCount={3} currentPage={currentPage} onPageChange={pageChange} />);
    await waitFor(() => expect(screen.queryByText(1)).toHaveClass('active'));
  });
});
