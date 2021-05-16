import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom";
import { Col, Row} from 'react-bootstrap'
import Filter from '../components/Filter/Filter';
import CardItem from '../components/CardItem';
import http from "../utils/http";
import { CarType } from '../types/Car';
import useQuery from '../hooks/useQuery';
import CarSkeleton from '../skeletons/CarSkeleton';
import PaginationComponent from '../components/Pagination/PaginationComponent';

export type CarsState = {
    cars: [CarType] | [],
    totalPageCount: number,
    totalCarsCount: number,
    isLoading: 'loading' | 'loaded'
}

function CarsPage() {  
    const [carsState, setCarsState] = useState<CarsState>({
        cars: [],
        totalPageCount: 0,
        totalCarsCount: 0,
        isLoading: 'loading'
    });
    let history = useHistory();

    const [filter, setFilter] = useState({
        filteredColor : useQuery('color') || "",
        filteredManufact : useQuery('manufacturer') || "",
        currPage: Number(useQuery('page')) || 1
    });
    
    useEffect(() => {

        const fetchCars = () => {
            let url = '/cars?';
            url += (filter.filteredColor !== "") ? `color=${filter.filteredColor}&`: "";
            url += (filter.filteredManufact  !== "") ? `manufacturer=${filter.filteredManufact}&`: "";
            url += filter.currPage ? `page=${filter.currPage}` : "";

            setCarsState({...carsState, isLoading: 'loading'});
            
            http.get(url)
            .then(res => res.data)
            .then(res => {
                console.log(res);            
                setCarsState({
                    cars: res.cars,
                    totalPageCount: res.totalPageCount,
                    totalCarsCount: res.totalCarsCount,
                    isLoading: 'loaded'
                })
            })
            .catch(err => setCarsState({...carsState, isLoading: 'loaded'}));

            handleUrl();
        }
        fetchCars();

    }, [filter])


    const handleFilter = (e: Event, filteredColor: string, filteredManufact: string ) => {
        e.preventDefault();

        setFilter({
            ...filter,
            'filteredColor' : filteredColor,
            'filteredManufact' : filteredManufact,
            'currPage': 1
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
                <h2>Showing {10*filter.currPage < carsState.totalCarsCount ? 10*filter.currPage : carsState.totalCarsCount } of {carsState.totalCarsCount} results</h2>
                {
                   carsState.isLoading === 'loading' ? 
                        Array(10).fill(undefined).map((a, i) => <CarSkeleton key={i} />)
                        : carsState.cars.map((car: CarType) => <CardItem key={car.stockNumber} car={car}/>)
                }

                <PaginationComponent 
                    currPage={filter.currPage}
                    totalPageCount={carsState.totalPageCount}
                    handlePagination={handlePagination}
                />
            </Col>
        </Row>
    )
}

export default CarsPage;
