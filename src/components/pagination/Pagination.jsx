import "./pagination.scss";
import ReactPaginate from "react-paginate";

const Pagination = ({ totalPage, currentPage }) => {
  const handlePageClick = (data) => {
    console.log(data);
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
    router.push(`/danh-sach/${type}/${path}?page=${data.selected + 1}`);
  };

  return (
    <div>
      <div className="pagination">
        <ReactPaginate
          onPageChange={handlePageClick}
          className="paginationPage"
          previousLabel="<"
          nextLabel=">"
          breakLabel={"..."}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          forcePage={parseInt(currentPage) - 1}
          previousClassName="prev"
          nextClassName="next"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default Pagination;
