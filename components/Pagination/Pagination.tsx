import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, pageCount, onChange }: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={page - 1}
      onPageChange={({ selected }) => onChange(selected + 1)}
      pageRangeDisplayed={5}
      marginPagesDisplayed={1}
      previousLabel="←"
      nextLabel="→"
      containerClassName={css.pagination}
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      previousClassName={css.pageItem}
      previousLinkClassName={css.pageLink}
      nextClassName={css.pageItem}
      nextLinkClassName={css.pageLink}
      breakClassName={css.pageItem}
      breakLinkClassName={css.pageLink}
      activeClassName={css.active}
    />
  );
}