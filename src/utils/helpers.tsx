export module favouriteHelper {
    export function setFavourite(stockNumber: number) {
        let favourites: Array<number> = getFavourites() || [];
        favourites.push(stockNumber);
        let updatedFavourites = [...Array.from(new Set(favourites))]
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
        return updatedFavourites;
    }

    export function getFavourites(): [] {
        return JSON.parse(localStorage.getItem('favourites') || "[]");
    }

    export function removeFavourite(stockNumber:number) {
        let favourites = getFavourites().filter(favourite => favourite !== stockNumber)
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }

    export function isFavourite(stockNumber:number) {
        return JSON.parse(localStorage.getItem('favourites') || "[]").indexOf(stockNumber) !== -1;
    }

    export function toggleFavourite(stockNumber: number) {
        return isFavourite(stockNumber) ? removeFavourite(stockNumber) : setFavourite(stockNumber);
    }
} 