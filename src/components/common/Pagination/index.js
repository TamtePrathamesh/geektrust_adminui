import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import LeftArrow from '../../images/left-arrow.png';
import RightArrow from '../../images/right-arrow.png';
import LeadingArrow from '../../images/leading-arrow.png';
import TrailingArrow from '../../images/trailing-arrow.png';

import Style from './style.module.css';

const getPages = (pageCount) => Array(pageCount).fill(0);

const Pagination = ({ pageCount = 0, currentPage = 0, onPageChange = () => null }) => {
  const [cPage, setCurrentPage] = useState(1);

  const nextPage = useCallback(() => {
    if (cPage <= pageCount) {
      let nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      onPageChange(nextPage, pageCount);
    }
  }, [cPage, currentPage, onPageChange, pageCount]);

  const previousPage = useCallback(() => {
    if (cPage >= 1) {
      let previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      onPageChange(previousPage, pageCount);
    }
  }, [cPage, currentPage, onPageChange, pageCount]);

  const pageChange = (page) => {
    if (cPage >= 1 && cPage <= pageCount) {
      setCurrentPage(page);
      onPageChange(page, pageCount);
    }
    if (cPage > pageCount) {
      setCurrentPage(pageCount);
      onPageChange(pageCount, pageCount);
    }
  };

  const firstPage = useCallback(() => {
    setCurrentPage(1);
    onPageChange(1);
  }, [onPageChange]);

  const lastPage = useCallback(() => {
    setCurrentPage(pageCount);
    onPageChange(pageCount);
  }, [onPageChange, pageCount]);

  return (
    <div className={Style.paginationContainer}>
      <div data-testid="leading" className={Style.pagination}>
        <div className={`${Style.actionBtn}`} onClick={firstPage}>
          <img width="10px" height="10px" src={LeadingArrow} alt="cant display" />
        </div>
        <div
          data-testid="previous"
          className={`${Style.actionBtn} ${cPage <= 1 ? Style.disableClick : ''}`}
          onClick={previousPage}
        >
          <img width="10px" height="10px" src={LeftArrow} alt="cant display" />
        </div>
        <div className={Style.contentOverflow}>
          {getPages(pageCount).map((_, index) => (
            <div key={index}>
              <button
                id="stepper"
                className={`${Style.stepper} ${currentPage === index + 1 ? Style.active : ''}`}
                onClick={() => pageChange(index + 1)}
              >
                {index + 1}
              </button>
            </div>
          ))}
        </div>
        <div
          data-testid="next"
          className={`${Style.actionBtn} ${cPage >= pageCount ? Style.disableClick : ''}`}
          onClick={nextPage}
        >
          <img src={RightArrow} alt="cant display" width="10px" height="10px" />
        </div>
        <div data-testid="trailing" className={`${Style.actionBtn}`} onClick={lastPage}>
          <img src={TrailingArrow} alt="cant display" width="10px" height="10px" />
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  pageCount: PropTypes.number,
  onPageChange: PropTypes.func,
  currentPage: PropTypes.number,
};

export default React.memo(Pagination);
