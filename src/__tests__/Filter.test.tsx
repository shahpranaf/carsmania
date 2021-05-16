import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import Filter from "../components/Filter/Filter";
import http from "../utils/http";
import userEvent from "@testing-library/user-event";

describe("renders Filter component correctly", () => {
	test("Verify Fitler component and dropdowns", async () => {
		mockGet();
		const handleMockedFilter = jest.fn();
		const selectedFilter = {
			filteredColor: "",
			filteredManufact: "",
			currPage: 1
		}
		const { getByText } = render(<Filter selectedFilter={selectedFilter} handleFilter={handleMockedFilter} />);

		await waitFor(() => expect(getByText(/red/)).toBeInTheDocument());
		expect(getByText(/Audi1/)).toBeInTheDocument();
		expect(getByText(/Filter/)).toBeInTheDocument();
		expect(getByText(/Reset/)).toBeInTheDocument();
	});

	test("Check selected Colors and Manufacturers", async () => {
		mockGet();
		const handleMockedFilter = jest.fn();
		const selectedFilter = {
			filteredColor: "",
			filteredManufact: "",
			currPage: 1
		}
		const { getByText, getByLabelText } = render(<Filter selectedFilter={selectedFilter} handleFilter={handleMockedFilter} />);

		await waitFor(() => expect(getByText(/red/)).toBeInTheDocument());
		
		const colorFilter = getByLabelText(/Color/);
		const ManufacturerFilter = getByLabelText(/Manufacturer/);

		expect(colorFilter[0].selected).toBeTruthy();
		expect(ManufacturerFilter[0].selected).toBeTruthy();
		
		userEvent.selectOptions(colorFilter, 'blue');
		userEvent.selectOptions(ManufacturerFilter, 'Audi2');
		
		expect(colorFilter[0].selected).toBeFalsy();
		expect(colorFilter[2].selected).toBeTruthy();
		
		expect(ManufacturerFilter[0].selected).toBeFalsy();
		expect(ManufacturerFilter[2].selected).toBeTruthy();

	});

	test("Check handleFilter function receives correct args", async () => {
		mockGet();
		const handleMockedFilter = jest.fn();
		const selectedFilter = {
			filteredColor: "red",
			filteredManufact: "Audi1",
			currPage: 1
		}
		const { getByText, getByLabelText } = render(<Filter selectedFilter={selectedFilter} handleFilter={handleMockedFilter} />);

		await waitFor(() => expect(getByText(/red/)).toBeInTheDocument());
		
		const colorFilter = getByLabelText(/Color/);
		const ManufacturerFilter = getByLabelText(/Manufacturer/);

		expect(colorFilter[1].selected).toBeTruthy();
		expect(ManufacturerFilter[1].selected).toBeTruthy();
		
		userEvent.selectOptions(colorFilter, 'blue');
		userEvent.selectOptions(ManufacturerFilter, 'Audi2');
		
		expect(colorFilter[2].selected).toBeTruthy();		
		expect(ManufacturerFilter[2].selected).toBeTruthy();

		fireEvent.click(getByText(/Filter/));
		expect(handleMockedFilter).toHaveBeenCalledWith('blue', 'Audi2');

	});

	test("Check Reset button is clearing all filters", async () => {
		mockGet();
		const handleMockedFilter = jest.fn();
		const selectedFilter = {
			filteredColor: "red",
			filteredManufact: "Audi1",
			currPage: 1
		}
		const { getByText, getByLabelText } = render(<Filter selectedFilter={selectedFilter} handleFilter={handleMockedFilter} />);

		await waitFor(() => expect(getByText(/red/)).toBeInTheDocument());
		
		fireEvent.click(getByText(/Reset/));
		expect(handleMockedFilter).toHaveBeenCalledWith('', '');
		
		await waitFor(() => {
			const colorFilter = getByLabelText(/Color/);
			const ManufacturerFilter = getByLabelText(/Manufacturer/);
		
			expect(colorFilter[1].selected).toBeTruthy();
			expect(ManufacturerFilter[1].selected).toBeTruthy();
		});

	});
});

function mockGet() {
	jest.spyOn(http, "get").mockImplementation((url) => {
		let returnValue;
		if (url === "/manufacturers") {
			returnValue = getMockedManufacturers();
		} else if (url === "/colors") {
			returnValue = getMockedColors();
		}
		return Promise.resolve(returnValue);
	});
}

function getMockedColors() {
	return {data: {"colors":["red","blue","green","black","yellow","white","silver"]} }
}

function getMockedManufacturers() {
	return {
		data: {
			"manufacturers" : [
				{
					"name":"Audi1",
					"models":[{"name":"A1"}, {"name": 'A2'}]
				},
				{
					"name":"Audi2",
					"models":[{"name":"B1"}, {"name": 'B2'}]
				}
			]
		}
	}
}
