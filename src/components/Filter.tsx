import React, { FormEventHandler, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import http, { httpAll } from "../utils/http";

const initialState = {
	colors: [],
	manufacturers: [],
};

type Props = {
	filteredManufact: string | undefined;
    filteredColor: string | undefined;
    handleFilter: FormEventHandler<HTMLFormElement>
};

function Filter(props: Props) {
	const { filteredColor, filteredManufact, handleFilter} = props;
	const [filter, setFilter] = useState(initialState);
	const [color, setColor] = useState(filteredColor);
	const [manufacturer, setManufacturer] = useState(filteredManufact);

	// const [colors, setColors] = useState([]);
	// const [manufacturers, setManufacturers] = useState([]);

	// useEffect(() => {
	//     http.get('/colors')
	//     .then(res => res.data)
	//     .then(res => {
	//         console.log(res)
	//         setColors(res.colors)
	//     })
	//     .catch(err => console.log(err))
	// }, [])

	// useEffect(() => {
	//     http.get('/manufacturers')
	//     .then(res => res.data)
	//     .then(res => {
	//         console.log(res)
	//         setManufacturers(res.manufacturers)
	//     })
	//     .catch(err => console.log(err))
	// }, [])

	useEffect(() => {
		httpAll([http.get("/colors"), http.get("/manufacturers")])
			.then((res) => {
				console.log(res);
				setFilter({
					colors: res[0].data.colors,
					manufacturers: res[1].data.manufacturers,
				});
			})
			.catch((err) => console.log(err));
	}, []);

	const handleChange = (e:any) => {
        switch(e.target.name) {
            case 'color': {
                setColor(e.target.value);
                break;
            }
            case 'manufacturer': {
                setManufacturer(e.target.value);
                break;
            }
        }
    };

	return (
		<div className="filter-container">
			<Form onSubmit={handleFilter}>
				<Form.Group controlId="color">
					<Form.Label>Color</Form.Label>
                    <Form.Control as="select" name="color" 
                        onChange={handleChange}
                        value={color}  
                        size="lg" 
                        custom
                    >
                        <option value="" key={-1}>Select</option>
						{filter.colors.map((color, i) => (
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
                        value={manufacturer} 
                        size="lg" 
                        custom
                    >
                        <option value="" key={-1}>Select</option>
						{filter.manufacturers.map((mf, i) => (
							<option value={mf["name"]}  key={i}>{mf["name"]}</option>
						))}
					</Form.Control>
				</Form.Group>

				<Button type="submit" className="ms-auto">
					Filter
				</Button>
			</Form>
		</div>
	);
}

export default Filter;
