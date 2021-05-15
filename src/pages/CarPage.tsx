import React, { useState, useEffect } from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import http from '../utils/http';
import { CarType } from '../types/Car';

import FavouriteButton from '../components/FavouriteButton';

function Car() {
    const history = useHistory();
    const params = useParams();
    const [carDetail, setCarDetail] = useState<CarType>({});
    console.log(Number(params['stockNumber']) || '0')
    const stockNumber = Number(params['stockNumber']);
    const { color, fuelType, pictureUrl, manufacturerName, mileage, modelName} = carDetail;

    useEffect(() => {
        if(stockNumber) {
            http.get(`/cars/${stockNumber}`)
            .then(res => res.data)
            .then(res => {
                console.log(res);
                setCarDetail(res.car)
            })
            .catch(err => history.push("/404"));
        } else {
            history.push("/404");
        }
    }, []);

    return (
        carDetail.manufacturerName ?
            <Container className="car-detail">
           
            <div className="car-img text-center mb-5">
                <Image src={pictureUrl} />
            </div>
            <div className="car-body wrapper">
                <Row>
                    <Col md={7}> 
                        <div className="car-detail-left d-flex">
                            <div className="car-body py-0">
                                <h2 className="mb-3">{manufacturerName+ " " +modelName}</h2>
                                <p className="mb-3">{`Stock #${stockNumber} - ${mileage?.number} ${mileage?.unit} - ${fuelType} - ${color}`}</p>
                                <p>{`This car is currently available and can be delivered 
                                    as soon as tommorow morning. Please be aware that delivery times shown 
                                    in this page are not definitive and may change due to bad weather 
                                    conditions`}
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col md={5}> 
                        <div className="car-detail-right pad-3 border">
                            <p>{`If you like this car, click the button and save it in your collection of favourite items.`}</p>
                            <FavouriteButton stockNumber={stockNumber} />
                        </div>
                    </Col>
                </Row>
                

            </div>
        </Container>
        :
        null
    )
}

export default Car
