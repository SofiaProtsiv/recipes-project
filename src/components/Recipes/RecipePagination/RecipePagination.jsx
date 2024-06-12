import cl from './recipePagination.module.scss';
import PropTypes from 'prop-types';

const RecipePagination = ({ handlePage, page, totalPages }) => {
  const renderPages = () => {
    const pages = [];
    const pageRange = 1;

    if (totalPages > 1) {
      let startPage = Math.max(1, page - pageRange);
      let endPage = Math.min(totalPages, page + pageRange);

      if (page <= pageRange) {
        endPage = Math.min(totalPages, 3);
      } else if (page + pageRange > totalPages) {
        startPage = Math.max(1, totalPages - 2);
      }

      for (let i = startPage; i <= endPage; i++) {
        const pageClass =
          i === page
            ? `${cl['wrapper-page']} ${cl['current-page']}`
            : `${cl['wrapper-page']}`;
        pages.push(
          <div key={i} className={pageClass}>
            <a
              className={`${cl['pageLink']}`}
              data-page={i}
              href="#"
              onClick={e => {
                e.preventDefault();
                handlePage(i);
              }}
            >
              {i}
            </a>
          </div>
        );
      }
    }
    return pages;
  };

  return <div className={cl.paginationWrapper}>{renderPages()}</div>;
};

RecipePagination.propTypes = {
  handlePage: PropTypes.func,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};
export default RecipePagination;
