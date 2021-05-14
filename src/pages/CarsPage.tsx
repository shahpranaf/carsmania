import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Col, Row} from 'react-bootstrap'
import Filter from '../components/Filter';
import CardItem from '../components/CardItem';
import http from "../utils/http";
import { CarType } from '../types/Car';
import useQuery from '../hooks/useQuery';
import CarSkeleton from '../skeletons/CarSkeleton';
import PaginationComponent from '../components/Pagination/PaginationComponent';

function CarsPage() {  
    const [loading, setLoading] = useState(false);  
    const [carsList, setCarsList] = useState({
        cars: [],
        totalPageCount: 0,
        totalCarsCount: 0
    });
    let history = useHistory();

    const [filter, setFilter] = useState({
        filteredColor : useQuery('color') || "",
        filteredManufact : useQuery('manufacturer') || "",
        currPage: 1
    });
    
    useEffect(() => {        
        let url = '/cars?';
        url += (filter.filteredColor !== "") ? `color=${filter.filteredColor}&`: "";
        url += (filter.filteredManufact  !== "") ? `manufacturer=${filter.filteredManufact}&`: "";
        url += filter.currPage ? `page=${filter.currPage}` : "";

        setLoading(true);
        http.get(url)
        .then(res => res.data)
        .then(res => {
            console.log(res);            
            setCarsList({
                cars: res.cars,
                totalPageCount: res.totalPageCount,
                totalCarsCount: res.totalCarsCount
            })
            setLoading(false);
        })
        .catch(err => console.log(err));

        handleUrl();

    }, [filter])


    const handleFilter = (e: Event, filteredColor: string, filteredManufact: string ) => {
        e.preventDefault();

        setFilter({
            ...filter,
            'filteredColor' : filteredColor,
            'filteredManufact' : filteredManufact
        });

        if(filteredColor || filteredManufact) {
            history.push(`/cars?color=${filteredColor}&manufacturer=${filteredManufact}`)
        }
    }
    
    const handlePagination = (page: number) => {
        setFilter({...filter, currPage: page});
    }

    const handleUrl = () => {
        let params = '';
        params += (filter.filteredColor !== "") ? `color=${filter.filteredColor}&`: "";
        params += (filter.filteredManufact  !== "") ? `manufacturer=${filter.filteredManufact}&`: "";
        params += filter.currPage ? `page=${filter.currPage}` : "";

        console.log(params)
        history.push({
            search: '?'+params
        });
    }

    return (        
        <Row className="cars-container">
            <Col md={3}>        
                <Filter selectedFilter={filter} handleFilter={handleFilter}/>
            </Col>
            <Col md={9}>        
                <h1>Available Cars</h1>
                <h2>Showing {10*filter.currPage < carsList.totalCarsCount ? 10*filter.currPage : carsList.totalCarsCount } of {carsList.totalCarsCount} results</h2>
                {
                   loading ? 
                        Array(10).fill(undefined).map((a, i) => <CarSkeleton key={i} />)
                        : carsList.cars.map((car: CarType) => <CardItem key={car.stockNumber} car={car}/>)
                }

                <PaginationComponent 
                    currPage={filter.currPage}
                    totalPageCount={carsList.totalPageCount}
                    handlePagination={handlePagination}
                />
            </Col>
        </Row>
    )
}

export default CarsPage;
