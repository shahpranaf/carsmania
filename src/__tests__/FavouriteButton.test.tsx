import React from "react";
import { fireEvent, render } from "@testing-library/react";
import FavouriteButton from "../components/FavouriteButton";

describe("renders Favourite Button component correctly", () => {
	test("Showing correct Favourite Button data", async () => {
		const { getByText, queryByText } = render(
			<FavouriteButton 
                addFavText={'Add'}
                removeFavText={'Remove'}
                customClass={'custom'}
                stockNumber={1000}
            />
        );
        const AddBtn = getByText(/Add/);
        expect(AddBtn).toHaveClass('custom');
        
        expect(AddBtn).toBeInTheDocument();
        fireEvent.click(AddBtn);

        const RemoveBtn = getByText(/Remove/);
        expect(RemoveBtn).toBeInTheDocument();
        expect(queryByText(/Add/)).toBeNull();

        fireEvent.click(RemoveBtn);
        expect(AddBtn).toBeInTheDocument();
        expect(queryByText(/Remove/)).toBeNull();
	});
	



	
});