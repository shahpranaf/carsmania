import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Filter from "../components/Filter/Filter";
import CardItem from "../components/CardItem/CardItem";
import { CarType } from "../types/Car";
import { FilterType } from "../types/Filter";
import useQuery from "../hooks/useQuery";
import CarSkeleton from "../skeletons/CarSkeleton";
import PaginationComponent from "../components/Pagination/PaginationComponent";
import { fetchCars } from "../apis/Cars";
import "../styles/CarsPage.scss";

export type CarsState = {
	cars: [CarType] | [];
	totalPageCount: number;
	totalCarsCount: number;
	status: "loading" | "loaded";
	error: Error | null;
};

function CarsPage() {
	const [carsState, setCarsState] = useState<CarsState>({
		cars: [],
		totalPageCount: 0,
		totalCarsCount: 0,
		status: "loading",
		error: null,
	});
	let history = useHistory();

	const [filter, setFilter] = useState<FilterType>({
		filteredColor: useQuery("color") || "",
		filteredManufact: useQuery("manufacturer") || "",
		currPage: Number(useQuery("page")) || 1,
	});

	useEffect(() => {
		const handleUrl = () => {
			let params = "";
			params += filter.filteredColor !== "" ? `color=${filter.filteredColor}&` : "";
			params += filter.filteredManufact !== "" ? `manufacturer=${filter.filteredManufact}&` : "";
			params += filter.currPage ? `page=${filter.currPage}` : "";

			history.push({
				search: "?" + params,
			});
		};

		const getCarsList = () => {
			setCarsState({ ...carsState, status: "loading" });

			fetchCars(filter)
				.then((res) => {
					setCarsState({
						cars: res.cars,
						totalPageCount: res.totalPageCount,
						totalCarsCount: res.totalCarsCount,
						status: "loaded",
						error: null,
					});
				})
				.catch((err) => setCarsState({ ...carsState, status: "loaded", error: err }));

			handleUrl();
		};
		getCarsList();
	}, [filter]);

	const handleFilter = (filteredColor: string, filteredManufact: string) => {
		setFilter({
			...filter,
			filteredColor: filteredColor,
			filteredManufact: filteredManufact,
			currPage: 1,
		});

		if (filteredColor || filteredManufact) {
			history.push(`/cars?color=${filteredColor}&manufacturer=${filteredManufact}`);
		}
	};

	const handlePagination = (page: number) => {
		setFilter({ ...filter, currPage: page });
	};

	return (
		<Row className="cars-container">
			<Col md={3}>
				<Filter selectedFilter={filter} handleFilter={handleFilter} />
			</Col>
			<Col md={9}>
				<h1 className="main-title">Available Cars</h1>
				<h2 className="main-sub-title">
					Showing{" "}
					{10 * filter.currPage < carsState.totalCarsCount ? 10 * filter.currPage : carsState.totalCarsCount}{" "}
					of {carsState.totalCarsCount} results
				</h2>
				{carsState.status === "loading"
					? Array(10)
							.fill(undefined)
							.map((a, i) => <CarSkeleton key={i} />)
					: carsState.cars.map((car: CarType) => <CardItem key={car.stockNumber} car={car} />)}

				<PaginationComponent
					currPage={filter.currPage}
					totalPageCount={carsState.totalPageCount}
					handlePagination={handlePagination}
				/>
			</Col>
		</Row>
	);
}

export default CarsPage;
