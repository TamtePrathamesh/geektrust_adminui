import React from 'react';
import PropTypes from 'prop-types';
import style from './style.module.css';

const VerticalGap = ({ height = 0 }) => {
  return <div className={style.gap} style={{ height: `${height}px` }}></div>;
};

VerticalGap.propTypes = {
  height: PropTypes.string,
};

export default React.memo(VerticalGap);
