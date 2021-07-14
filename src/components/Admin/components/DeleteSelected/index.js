import React from 'react';
import PropTypes from 'prop-types';
import { WithBoundary } from '../../../common';

import Style from './style.module.css';

const DeleteSelected = ({ deleteSelected }) => {
  return (
    <div className={Style.container}>
      <button data-testid="deleteSelected" className={Style.deleteSelected} onClick={() => deleteSelected()}>
        Delete Selected
      </button>
    </div>
  );
};

DeleteSelected.propTypes = {
  deleteSelected: PropTypes.func,
};

export default WithBoundary(React.memo(DeleteSelected));
