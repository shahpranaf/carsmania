import { Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CarType } from "../../types/Car";

import "./CardItem.scss";

type Props = {
	car: CarType;
	linkText?: string;
};

function CardItem(props: Props) {
	const { stockNumber, color, fuelType, pictureUrl, manufacturerName, mileage, modelName } = props.car;
	const { linkText } = props;

	return (
		<Card className="d-flex flex-row pad-2 border">
			<div className="car-img mr-10">
				<Image width="85px" height="85px" alt="Car Image" thumbnail src={pictureUrl} />
			</div>
			<Card.Body className="car-body py-0">
				<Card.Title className="mb-1 car-title">{manufacturerName + " " + modelName}</Card.Title>
				<Card.Text className="mb-1 car-sub-title">{`Stock #${stockNumber} - ${mileage?.number} ${mileage?.unit} - ${fuelType} - ${color}`}</Card.Text>
				<Link to={`/car/${stockNumber}`}>{linkText || "View details"}</Link>
			</Card.Body>
		</Card>
	);
}

export default CardItem;
