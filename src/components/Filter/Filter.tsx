import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { fetchColors, fetchManufacturers } from "../../apis/Cars";
import { FilterType } from "../../types/Filter";
import { httpAll } from "../../utils/http";
import "./filter.scss";

const initialState = {
	colors: [],
	manufacturers: [],
};

type Props = {
	selectedFilter: FilterType;
	handleFilter: Function;
};

function Filter(props: Props) {
	const { selectedFilter } = props;
	const [filterData, setFilterData] = useState(initialState);
	const [filter, setFilter] = useState({
		color: "",
		manufacturer: ""
	});

	useEffect(() => {
		setFilter({
			color: selectedFilter.filteredColor,
			manufacturer: selectedFilter.filteredManufact,
		});
	}, [selectedFilter]);

	useEffect(() => {
		httpAll([fetchColors(), fetchManufacturers()])
			.then((res) => {
				setFilterData({
					colors: res[0].colors,
					manufacturers: res[1].manufacturers,
				});
			})
			.catch((err) => console.log(err));
	}, []);

	const handleChange = (e) => {
		setFilter({
			...filter,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e, color, manufacturer) => {
		e.preventDefault();
		console.log(color, manufacturer)
		props.handleFilter(color, manufacturer);
	};

	return (
		<div className="filter-container">
			<Form onSubmit={(e) => handleSubmit(e, filter.color, filter.manufacturer)}>
				<Form.Group controlId="color">
					<Form.Label className="text-14">Color</Form.Label>
					<Form.Control
						as="select"
						name="color"
						onChange={handleChange}
						value={filter.color}
						size="lg"
						custom
					>
						<option value="" key={-1}>
							Select
						</option>
						{filterData.colors.map((color, i) => (
							<option value={color} key={i}>
								{color}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<Form.Group controlId="manufacturer">
					<Form.Label className="text-14">Manufacturer</Form.Label>
					<Form.Control
						as="select"
						name="manufacturer"
						onChange={handleChange}
						value={filter.manufacturer}
						size="lg"
						custom
					>
						<option value="" key={-1}>
							Select
						</option>
						{filterData.manufacturers.map((mf, i) => (
							<option value={mf["name"]} key={i}>
								{mf["name"]}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<Button type="submit" disabled={!filter.color && !filter.manufacturer} className="ms-auto">
					Filter
				</Button>
				<Button
					onClick={(e) => handleSubmit(e, "", "")}
					disabled={!filter.color && !filter.manufacturer}
					className="ms-2 btn btn-danger"
				>
					Reset
				</Button>
			</Form>
		</div>
	);
}

export default React.memo(Filter);
