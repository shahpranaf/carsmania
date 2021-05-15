import React, { FormEventHandler, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http, { httpAll } from "../../utils/http";
import './filter.scss';

const initialState = {
	colors: [],
	manufacturers: [],
};

type Props = {
    selectedFilter: {
        filteredManufact: string;
        filteredColor: string;
    }	
    handleFilter: Function
};

function Filter(props: Props) {
	const { selectedFilter, handleFilter} = props;
	console.log("---",selectedFilter)
	const [filterData, setFilterData] = useState(initialState);
	const [filter, setFilter] = useState({
		color: "",
		manufacturer: ""
	});

	useEffect(() => {
		setFilter({
			color: selectedFilter.filteredColor,
			manufacturer: selectedFilter.filteredManufact
		})
	}, [selectedFilter]);

	useEffect(() => {
		httpAll([http.get("/colors"), http.get("/manufacturers")])
			.then((res) => {
				console.log(res);
				setFilterData({
					colors: res[0].data.colors,
					manufacturers: res[1].data.manufacturers,
				});
			})
			.catch((err) => console.log(err));
	}, []);

	const handleChange = (e:any) => {
		setFilter({
			...filter,
			[e.target.name]: [e.target.value]
		})
    };

	return (
		<div className="filter-container">
			<Form onSubmit={(e) => handleFilter(e, filter.color, filter.manufacturer)}>
				<Form.Group controlId="color">
					<Form.Label>Color</Form.Label>
                    <Form.Control as="select" name="color" 
                        onChange={handleChange}
                        value={filter.color}  
                        size="lg" 
                        custom
                    >
                        <option value="" key={-1}>Select</option>
						{filterData.colors.map((color, i) => (
							<option value={color} key={i}>
								{color}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<Form.Group controlId="manufacturer">
					<Form.Label>Manufacturer</Form.Label>
                    <Form.Control as="select" name="manufacturer" 
                        onChange={handleChange}
                        value={filter.manufacturer} 
                        size="lg" 
                        custom
                    >
                        <option value="" key={-1}>Select</option>
						{filterData.manufacturers.map((mf, i) => (
							<option value={mf["name"]}  key={i}>{mf["name"]}</option>
						))}
					</Form.Control>
				</Form.Group>

				<Button type="submit" disabled={!filter.color && !filter.manufacturer} className="ms-auto">
					Filter
				</Button>
                <Button onClick={(e) => handleFilter(e, "", "")} type="btn btn-danger" disabled={!filter.color && !filter.manufacturer} className="ms-2">
					Reset
				</Button>
			</Form>
		</div>
	);
}

export default React.memo(Filter);
