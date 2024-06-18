import Pagination from '../ui/Pagination/Pagination';
import { useEffect, useState } from 'react';
import cl from './ListPagination.module.scss';
import PropTypes from 'prop-types';

const PAGE_RANGE = 1;
const ListPagination = ({ handlePage, page, total, limit }) => {
  const [totalPages, setTotalPages] = useState(0);
  console.log(total, 'limit', limit, 'page', page, 'totpages', totalPages);

  useEffect(() => {
    setTotalPages(Math.ceil(total / limit));
  }, [total, limit]);

  return (
    totalPages > 1 && (
      <Pagination
        handlePage={handlePage}
        addClass={cl.listPagination}
        page={page}
        totalPages={totalPages}
        pageRande={PAGE_RANGE}
      />
    )
  );
};

ListPagination.propTypes = {
  handlePage: PropTypes.func,
  page: PropTypes.number,
  limit: PropTypes.number,
  total: PropTypes.number,
};

export default ListPagination;
