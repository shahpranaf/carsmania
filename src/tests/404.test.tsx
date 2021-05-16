import React from "react";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import CarsPage from "../pages/CarsPage";
import http from "../utils/http";
import { BrowserRouter } from "react-router-dom";
import NOTFOUND from "../pages/404";

describe("renders 404 page correctly", () => {
	test("Showing correct 404 data", async () => {
		const { getByText } = render(<NOTFOUND />);
		expect(getByText(/404/)).toBeInTheDocument();
		expect(getByText(/Sorry/)).toBeInTheDocument();
	});

	test("Showing correct home button and path", async () => {
		const { getByText } = render(<NOTFOUND />);
		const homeButton = getByText(/homepage/);
		expect(homeButton).toBeInTheDocument();
		expect(homeButton).toHaveAttribute("href", "/");
	});
});