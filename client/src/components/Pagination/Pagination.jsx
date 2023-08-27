import styled from './Pagination.module.css';

const Pagination = ({ currentPage, setCurrentPage, generatePagination }) => {
    return (
        <div className={styled.pagination}>
            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={styled.paginationButton}
            >
                &#60;
            </button>
            {generatePagination().map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`${styled.paginationButton} ${currentPage === pageNum ? styled.activePage : ''}`}
                >
                    {pageNum}
                </button>
            ))}
            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === generatePagination().length}
                className={styled.paginationButton}
            >
                &#62;
            </button>
        </div>
    );
}

export default Pagination;
