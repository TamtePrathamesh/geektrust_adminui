import React from 'react';
import PropTypes from 'prop-types';

import Style from './style.module.css';

const SearchAdmin = ({ onFilter }) => {
  return (
    <>
      <input
        data-testid="search"
        className={Style.search}
        type="text"
        placeholder="Search by name, email or role"
        onChange={onFilter}
      />
    </>
  );
};

SearchAdmin.propTypes = {
  onFilter: PropTypes.func,
};

export default React.memo(SearchAdmin);
