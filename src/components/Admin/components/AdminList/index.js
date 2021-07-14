import React from 'react';
import PropType from 'prop-types';
import { RenderAdminRow } from './components';
import { WithBoundary } from '../../../common';

import './style.css';

const AdminList = ({ adminList, filter, onDelete, onEdit, onSelectOrDeselectAll, onSelectOrDeselect }) => {
  const isAllSelected = adminList.every(({ selection }) => selection);

  return (
    <>
      <div className="table-responsive-sm">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  data-testid="selectAll"
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={onSelectOrDeselectAll}
                />
              </th>
              <th scope="col" className="columnName">
                Name
              </th>
              <th scope="col" className="columnName">
                Email
              </th>
              <th scope="col" className="columnName">
                Role
              </th>
              <th scope="col" className="columnName">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {adminList &&
              adminList
                .filter(({ name, email, role }) => {
                  return (
                    name.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
                    email.toLowerCase().indexOf(filter.toLowerCase()) !== -1 ||
                    role.toLowerCase().indexOf(filter.toLowerCase()) !== -1
                  );
                })
                .map(({ id, name, email, role, selection }) => (
                  <RenderAdminRow
                    key={id}
                    admin={{ id, name, email, role, selection }}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onSelectOrDeselect={onSelectOrDeselect}
                  />
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

AdminList.propTypes = {
  filter: PropType.string,
  onDelete: PropType.func,
  onEdit: PropType.func,
  onSelectOrDeselectAll: PropType.func,
  onSelectOrDeselect: PropType.func,
  adminList: PropType.arrayOf(
    PropType.shape({
      id: PropType.string,
      name: PropType.string,
      email: PropType.string,
      role: PropType.string,
      selection: PropType.bool,
    })
  ),
};

export default WithBoundary(React.memo(AdminList));
