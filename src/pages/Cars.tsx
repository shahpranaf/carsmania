import React, { useEffect, useState } from 'react'
import { Col, Card, Row, Button, Image } from 'react-bootstrap'
import Filter from '../components/Filter';
import CardItem from '../components/CardItem';
import http from "../utils/http";
import { Car } from '../utils/model';
import useQuery from '../hooks/useQuery';

function Cars(props: any) {    
    const [cars, setCars] = useState([]);
    const queryParams = useQuery();
    let filteredColor = queryParams.get('color') || "";
    let filteredManufact = queryParams.get('manufacturer') || "";
     
    
    useEffect(() => {
        const url = `/cars?manufacturer=${filteredManufact}&color=${filteredColor}`
        http.get(url)
        .then(res => res.data)
        .then(res => {
            console.log(res);
            setCars(res.cars)
        })
        .catch(err => console.log(err));
    }, [filteredColor, filteredManufact])


    const handleFilter = (e: any) => {
        e.preventDefault();
        console.log("ddd")
        filteredColor = "";
    }

    return (
        <Row className="cars-container">
            <Col md={3}>        
                <Filter filteredManufact={filteredManufact} filteredColor={filteredColor} handleFilter={handleFilter}/>
            </Col>
            <Col md={9}>        
                <h1>Available Cars</h1>
                <h2>Showing 10 of 100 results</h2>
                {
                    cars.map((car: Car) => <CardItem key={car.stockNumber} car={car}/>)
                }
            </Col>
        </Row>
    )
}

export default Cars
