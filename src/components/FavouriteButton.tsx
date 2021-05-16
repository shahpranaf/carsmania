import React, { useState } from "react";
import { favouriteHelper } from "../utils/helpers";

type Props = {
	addFavText?: string;
	removeFavText?: string;
	stockNumber: number;
	customClass?: string;
};

function FavouriteButton(props: Props) {
	const { stockNumber, customClass } = props;
	const [toggleFavourite, setToggleFavourite] = useState(favouriteHelper.isFavourite(stockNumber) || false);

	const handleFavourite = () => {
		setToggleFavourite(!toggleFavourite);
		favouriteHelper.toggleFavourite(stockNumber);
	};

	return (
		<button className={customClass ? customClass : `btn btn-primary mr-auto`} onClick={handleFavourite}>
			{!toggleFavourite ? props.addFavText || "Save" : props.removeFavText || "Remove"}
		</button>
	);
}

export default FavouriteButton;
