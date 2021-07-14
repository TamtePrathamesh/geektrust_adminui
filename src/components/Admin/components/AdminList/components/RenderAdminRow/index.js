import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import AdminActions from '../AdminActions';
import { WithBoundary } from '../../../../../common';
import CheckIcon from '../../../../../images/check.png';
import RemoveIcon from '../../../../../images/remove.png';

import Style from './style.module.css';

const RenderAdminRow = ({
  admin: { id, name, email, role, selection = false },
  onDelete,
  onEdit,
  onSelectOrDeselect,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const roleRef = useRef(null);

  return (
    <>
      <tr data-testid="tr" className={selection ? Style.selectedRow : ''}>
        {!isEdit ? (
          <>
            <td>
              <input
                data-testid="selectRow"
                type="checkbox"
                checked={selection}
                onChange={(e) => onSelectOrDeselect(id, e)}
              />
            </td>
            <td className={Style.columnName}>{name}</td>
            <td className={Style.columnName}>{email}</td>
            <td className={Style.columnName}>{role}</td>
            <td>
              <AdminActions onDelete={onDelete} onEditMode={setIsEdit} id={id} />
            </td>
          </>
        ) : (
          <>
            <td>
              <input type="checkbox" checked={selection} onChange={(e) => onSelectOrDeselect(id, e)} />
            </td>
            <td>
              <input type="text" defaultValue={name} ref={nameRef} />
            </td>
            <td>
              <input type="text" defaultValue={email} ref={emailRef} />
            </td>
            <td>
              <input type="text" defaultValue={role} ref={roleRef} />
            </td>
            <td>
              <div data-testid="rowEditAction" className={Style.rowEditAction}>
                <img
                  src={CheckIcon}
                  width="24px"
                  height="24px"
                  data-testid="saveRow"
                  onClick={() => {
                    onEdit(id, {
                      name: nameRef.current.value,
                      email: emailRef.current.value,
                      role: roleRef.current.value,
                    });
                    setIsEdit(false);
                  }}
                />
                <img src={RemoveIcon} onClick={() => setIsEdit(false)} width="24px" height="24px" />
              </div>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

RenderAdminRow.propTypes = {
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onSelectOrDeselect: PropTypes.func,
  admin: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    selection: PropTypes.bool,
  }),
};

export default WithBoundary(React.memo(RenderAdminRow));
