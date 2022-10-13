import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = ({ onPageChange, currentPage }) => {
	return (
		<ReactPaginate
			className={styles.root}
			breakLabel="..."
			nextLabel=">"
			previousLabel="<"
			onPageChange={(e) => onPageChange(e.selected + 1)}
			pageRangeDisplayed={8}
			pageCount={3}
			renderOnZeroPageCount={null}
			forcePage={currentPage - 1}
		/>
	);
};

export default Pagination;
