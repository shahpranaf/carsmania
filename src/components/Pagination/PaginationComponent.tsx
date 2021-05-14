import React from "react";
import './pagination.scss';

import { Pagination } from "react-bootstrap";

type Props = {
    handlePagination: Function,
    currPage: number,
    totalPageCount: number
}

function PaginationComponent(props: Props) {
	return (
		<Pagination size="sm">
			<Pagination.Item disabled={props.currPage === 1} onClick={() => props.handlePagination(1)}>
				First
			</Pagination.Item>
			<Pagination.Item disabled={props.currPage === 1} onClick={() => props.handlePagination(props.currPage - 1)}>
				Prev
			</Pagination.Item>

			<Pagination.Item disabled>
				<span>
					{props.currPage} of {props.totalPageCount}
				</span>
			</Pagination.Item>

			<Pagination.Item
				disabled={props.currPage === props.totalPageCount}
				onClick={() => props.handlePagination(props.currPage + 1)}
			>
				Next
			</Pagination.Item>
			<Pagination.Item
				disabled={props.currPage === props.totalPageCount}
				onClick={() => props.handlePagination(props.totalPageCount)}
			>
				Last
			</Pagination.Item>
		</Pagination>
	);
}

export default React.memo(PaginationComponent);
