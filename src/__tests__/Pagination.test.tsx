import React from "react";
import { fireEvent, render } from "@testing-library/react";
import PaginationComponent from "../components/Pagination/PaginationComponent";

describe("renders Pagination component correctly", () => {
	test("Showing correct current page and page count 2 of 10", async () => {
		const handlePaginationMock = jest.fn();
		
		const { getByText, getByAltText } = render(
			<PaginationComponent currPage={2} handlePagination={handlePaginationMock} totalPageCount={10}/>
		);
		expect(getByText(/2 of 10/)).toBeInTheDocument();
	});
	test("Showing correct pagination text and First, Prev - disabled", async () => {
		const handlePaginationMock = jest.fn();
		
		const { getByText, getByAltText } = render(
			<PaginationComponent currPage={1} handlePagination={handlePaginationMock} totalPageCount={10}/>
		);
		expect(getByText(/1 of 10/)).toBeInTheDocument();
		
		expect(getByText(/First/)).toBeInTheDocument();
		expect(getByText(/First/)).toHaveAttribute('disabled');
		
		expect(getByText(/Prev/)).toBeInTheDocument();
		expect(getByText(/Prev/)).toHaveAttribute('disabled');

		expect(getByText(/Next/)).toBeInTheDocument();
		expect(getByText(/Next/)).toHaveAttribute('role', 'button');
		expect(getByText(/Next/)).toHaveAttribute('href', '#');

		expect(getByText(/Last/)).toBeInTheDocument();
		expect(getByText(/Last/)).toHaveAttribute('role', 'button');
		expect(getByText(/Last/)).toHaveAttribute('href', '#');
	});

	test("Showing correct pagination text - Next, Last - disabled", async () => {
		const handlePaginationMock = jest.fn();
		
		const { getByText, getByAltText } = render(
			<PaginationComponent currPage={10} handlePagination={handlePaginationMock} totalPageCount={10}/>
		);
		expect(getByText(/10 of 10/)).toBeInTheDocument();
		
		expect(getByText(/Last/)).toBeInTheDocument();
		expect(getByText(/Last/)).toHaveAttribute('disabled');
		
		expect(getByText(/Next/)).toBeInTheDocument();
		expect(getByText(/Next/)).toHaveAttribute('disabled');

		expect(getByText(/Prev/)).toBeInTheDocument();
		expect(getByText(/Prev/)).toHaveAttribute('role', 'button');
		expect(getByText(/Prev/)).toHaveAttribute('href', '#');

		expect(getByText(/First/)).toBeInTheDocument();
		expect(getByText(/First/)).toHaveAttribute('role', 'button');
		expect(getByText(/First/)).toHaveAttribute('href', '#');
	});

	test("Check handlePagination is getting called with correct args", async () => {
		const handlePaginationMock = jest.fn();
		
		const { getByText } = render(
			<PaginationComponent currPage={1} handlePagination={handlePaginationMock} totalPageCount={10}/>
		);
		
		expect(getByText(/Next/)).toBeInTheDocument();
		fireEvent.click(getByText(/Next/));
		expect(handlePaginationMock).toHaveBeenCalledWith(2);

		expect(getByText(/Last/)).toBeInTheDocument();
		fireEvent.click(getByText(/Last/));
		expect(handlePaginationMock).toHaveBeenCalledWith(10);

	});


	
});