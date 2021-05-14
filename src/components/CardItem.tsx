import React from 'react'
import { Card, Image, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { CarType } from '../types/Car';

type Props = {
    car : CarType,
    linkText?: string
}

function CardItem(props: Props) {
    const { stockNumber, color, fuelType, pictureUrl, manufacturerName, mileage, modelName } = props.car;
    const { linkText } = props;

    return (
        <Card className="d-flex flex-row pad-2 border">
            <div className="car-img mr-10">
                <Image width="100px" height="100px" thumbnail src={pictureUrl} />
            </div>
            <Card.Body className="car-body py-0">
            <Card.Title className="mb-1">{manufacturerName+ " " +modelName}</Card.Title>
            <Card.Text className="mb-1">{`Stock #${stockNumber} - ${mileage?.number} ${mileage?.unit} - ${fuelType} - ${color}`}</Card.Text>
                <Link to={`/car/${stockNumber}`}>{linkText || "View details"}</Link>
            </Card.Body>
        </Card>
    )
}

export default CardItem
