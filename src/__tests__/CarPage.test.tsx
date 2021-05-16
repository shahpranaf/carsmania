import React from "react";
import { render, waitFor } from "@testing-library/react";
import CarPage from "../pages/CarPage";
import { MemoryRouter, Router} from "react-router-dom";
import { createMemoryHistory } from "history";
import ReactRouter from "react-router";
import { getMockedCarList, mockGet } from '../__mocks__/mock';

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
