import "./App.scss";

import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import NotFound from "./pages/404";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import CarsPage from "./pages/CarsPage";
import CarPage from "./pages/CarPage";

function App() {
	return (
		<Router>
			<Container fluid className="px-0">
				<Header />
				<div className="pad-3">
					<Switch>
						<Route exact path="/" render={() => <Redirect to="/cars" />} />
						<Route exact path="/cars" component={CarsPage} />
						<Route exact path="/car/:stockNumber" component={CarPage} />
						<Route path="*" component={NotFound} />
					</Switch>
				</div>

				<Footer />
			</Container>
		</Router>
	);
}

export default App;
