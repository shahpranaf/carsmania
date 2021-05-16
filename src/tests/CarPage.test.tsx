import React from "react";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import CarPage from "../pages/CarPage";
import http from "../utils/http";
import RRD, { BrowserRouter, MemoryRouter, Router, useHistory } from "react-router-dom";
import { createMemoryHistory } from "history";
import ReactRouter from "react-router";

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useHistory: () => ({
//       push: (to) => `Redirected to ${to}`
//     })
//   }));

describe("renders car Detail page correctly", () => {
	test("Load car detail correctly using url params", async () => {
		mockGet(getMockedCarList(1, false));

		jest.spyOn(ReactRouter, "useParams").mockReturnValue({ stockNumber: "12" });

		const { getByText } = render(
			<MemoryRouter initialEntries={["/car/12"]}>
				<CarPage />
			</MemoryRouter>
		);

		await waitFor(() => expect(getByText(/Fiat1/)).toBeInTheDocument());

		expect(getByText(/favourite items/)).toBeInTheDocument();
		jest.clearAllMocks();
	});

	test("Redirect to 404 if stockNumber is string", async () => {
		jest.spyOn(ReactRouter, "useParams").mockReturnValue({ stockNumber: "abc" });

		const history = createMemoryHistory();
		const pushSpy = jest.spyOn(history, "push"); // or 'replace', 'goBack', etc.
		render(
			<Router history={history}>
				<CarPage />
			</Router>
		);

		expect(pushSpy).toHaveBeenCalledWith("/404");
	});
});

function mockGet(returnValue) {
	return jest.spyOn(http, "get").mockImplementation((url) => {
		console.log("url", url);
		return Promise.resolve(returnValue);
	});
}

function getMockedCarList(count = 1, arr = true) {
	const cars = [];
	for (let i = 1; i <= count; i++) {
		cars.push({
			stockNumber: i,
			manufacturerName: "Fiat" + i,
			modelName: "M" + i,
			color: "blue" + i,
			mileage: { number: "111" + i, unit: "km" },
			fuelType: "Petrol",
			pictureUrl: `https://image${i}`,
		});
	}

	if (!arr) {
		return { data: { car: cars[0] } };
	}

	return {
		data: {
			cars: cars,
			totalPageCount: 100,
			totalCarsCount: 1000,
		},
	};
}
