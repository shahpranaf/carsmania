import React from "react";
import { Nav, Row } from "react-bootstrap";
import logo from "../static/logo.png";
import "../styles/404.scss";

const NotFound = () => {
	return (
		<Row className="justify-content-md-center not-found-container">
			<img className="not-found-img" src={logo} alt="not found" />
			<h1 className="text-bold text-32">404 - Not Found</h1>
			<p className="text-18">Sorry, the page you are looking for does not exist.</p>
			<p className="text-18">
				You can always go back to{" "}
				<Nav.Link href="/" className="d-inline p-0 m-0 text-18">
					homepage
				</Nav.Link>
				.
			</p>
		</Row>
	);
};

export default NotFound;
