/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useReducer } from 'react';
import { AdminList, SearchAdmin, DeleteSelected } from './components';
import { WithBoundary, VerticalGap, Pagination } from '../common';
import { getAdminList } from './admin.helper';

import Style from './style.module.css';

const initialState = {
  offset: 0,
  perPage: 10,
  currentPage: 1,
  pageCount: 0,
  admins: [],
  filter: '',
};

const reducer = (state, { type, value }) => {
  switch (type) {
    case 'state':
      return { ...state, ...value };
    default:
      return initialState;
  }
};

const Admin = () => {
  const [{ pageCount, currentPage, perPage, offset, admins, filter }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (admins.length === 0) {
      const getAdmins = async () => {
        try {
          const res = await getAdminList();
          let updated = res.map((i) => {
            return { ...i, selection: false };
          });
          dispatch({
            type: 'state',
            value: {
              pageCount: Math.ceil(updated.length / perPage),
              admins: updated,
              paginatedData: res.slice(offset, offset + perPage),
            },
          });
        } catch (error) {
          console.error(error);
        }
      };
      getAdmins();
    }
  }, []);

  const getPaginatedData = useCallback(() => {
    return admins.slice(offset, offset + perPage);
  }, [admins, offset, perPage]);

  const onFilter = useCallback((e) => {
    let value = e.target.value;
    if (value) {
      dispatch({ type: 'state', value: { filter: value } });
    } else {
      dispatch({ type: 'state', value: { filter: '' } });
    }
  }, []);

  const onDelete = useCallback(
    (id) => {
      if (id) {
        let filtered = admins.filter(({ id: userId }) => userId !== id);
        dispatch({
          type: 'state',
          value: {
            pageCount: Math.ceil(filtered.length / perPage),
            admins: filtered,
          },
        });
      }
    },
    [admins, perPage]
  );

  const onEdit = useCallback(
    (id, admin) => {
      if (id && admin) {
        let updatedAdmins = admins.map((ad) => (ad.id === id ? Object.assign({}, ad, admin) : ad));
        dispatch({ type: 'state', value: { admins: updatedAdmins } });
      }
    },
    [admins]
  );

  const onSelectOrDeselectAll = useCallback(
    (selection) => {
      let update = admins.map((admin, index) => {
        if (index >= offset && index < offset + perPage) {
          return { ...admin, selection: selection.target.checked };
        }
        return admin;
      });
      dispatch({ type: 'state', value: { admins: [...update] } });
    },
    [admins, offset, perPage]
  );

  const onSelectOrDeselect = useCallback(
    (id, selection) => {
      if (id) {
        let updated = admins.map((ad) => (ad.id === id ? { ...ad, selection: selection.target.checked } : ad));
        dispatch({ type: 'state', value: { admins: updated } });
      }
    },
    [admins]
  );

  const deleteSelected = useCallback(() => {
    let updated = admins.filter(({ selection }) => !selection);
    dispatch({
      type: 'state',
      value: {
        pageCount: Math.ceil(updated.length / perPage),
        admins: updated,
      },
    });
  }, [admins, perPage]);

  const handlePageClick = useCallback(
    (selected, pageCounts) => {
      const selectedPage = selected;
      const calculatedOffset = selectedPage * perPage - perPage;
      dispatch({
        type: 'state',
        value: {
          currentPage: pageCounts < currentPage ? pageCount : selectedPage,
          offset: calculatedOffset,
          paginatedData: admins.slice(calculatedOffset, calculatedOffset + perPage),
        },
      });
    },
    [admins, perPage]
  );

  return (
    <div className={Style.adminContainer}>
      <SearchAdmin onFilter={onFilter} />
      <VerticalGap height="15" />
      {admins && (
        <AdminList
          adminList={getPaginatedData()}
          filter={filter}
          onDelete={onDelete}
          onEdit={onEdit}
          onSelectOrDeselectAll={onSelectOrDeselectAll}
          onSelectOrDeselect={onSelectOrDeselect}
        />
      )}
      <div className={Style.bottomSide}>
        <DeleteSelected deleteSelected={deleteSelected} />
        <div className={Style.paginated}>
          <Pagination pageCount={pageCount} currentPage={currentPage} onPageChange={handlePageClick} />
        </div>
      </div>
    </div>
  );
};

export default WithBoundary(Admin);
