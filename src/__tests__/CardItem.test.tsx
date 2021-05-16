import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CardItem from "../components/CardItem/CardItem";
import { CarType } from "../types/Car";

describe("renders CardItem component correctly", () => {
	test("Showing correct Card data as passed to the component", async () => {
        let car: CarType = {
            stockNumber: 1000,
			manufacturerName: "Fiat",
			modelName: "Mercedez",
			color: "blue",
			mileage: { number: 111, unit: "km" },
			fuelType: "Petrol",
			pictureUrl: `https://image`,
        }
		const { getByText, getByAltText } = render(<BrowserRouter><CardItem car={car}/></BrowserRouter>);
		expect(getByText(/Stock #1000 - 111 km - Petrol - blue/)).toBeInTheDocument();
		expect(getByText(/View details/)).toBeInTheDocument();
		expect(getByAltText(/Car Image/)).toHaveAttribute('src', 'https://image');
	});

	test("Showing correct linktext when passed from props", async () => {
        let car: CarType = {
            stockNumber: 1000,
			manufacturerName: "Fiat",
			modelName: "Mercedez",
			color: "blue",
			mileage: { number: 111, unit: "km" },
			fuelType: "Petrol",
			pictureUrl: `https://image`,
        }
        let linkText = "Click here"
		const { getByText } = render(<BrowserRouter><CardItem car={car} linkText={linkText}/></BrowserRouter>);
		expect(getByText(/Click here/)).toBeInTheDocument();
	});
});