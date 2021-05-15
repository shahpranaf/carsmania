import React from 'react'
import { Card } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';


function CarSkeleton() {
    return (
        <Card data-testid="CarSkeleton" className="d-flex flex-row pad-2 border">
            <div className="car-img mr-10">
                <Skeleton width="80px" height="80px"/>
            </div>
            <Card.Body className="car-body py-0">
                <Card.Title className="mb-1"><Skeleton height="30px"/></Card.Title>
                <Card.Text className="mb-1"><Skeleton height="20px"/></Card.Text>
                <Skeleton width="100px" />
            </Card.Body>
        </Card>
    )
}

export default React.memo(CarSkeleton)
