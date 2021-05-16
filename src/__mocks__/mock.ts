import http from "../utils/http";
import { CarType } from "../types/Car";

export function mockGet(returnValue) {
	return jest.spyOn(http, "get").mockImplementation((url) => {
		return Promise.resolve(returnValue);
	});
}

export function getMockedCarList(count = 1, arr = true) {
	const cars: Array<CarType> = [];
	for (let i = 1; i <= count; i++) {
		cars.push({
			stockNumber: i,
			manufacturerName: "Fiat" + i,
			modelName: "M" + i,
			color: "blue" + i,
			mileage: { number: Number("111" + i), unit: "km" },
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