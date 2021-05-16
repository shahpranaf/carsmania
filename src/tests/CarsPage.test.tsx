import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import CarsPage from '../pages/CarsPage';
import http from '../utils/http';
import { BrowserRouter } from 'react-router-dom';


jest.mock("../components/Filter/Filter", () => {
  return () => null
});

jest.mock("../hooks/useQuery", () => {
  return (p) => p
});

// jest.mock('react-router-dom', () => {
//   const originalModule = jest.requireActual('react-router-dom');
//   return {
//     __esModule: true,
//     ...originalModule,
//     useHistory: () => ({
//       push: jest.fn(),
//     }),
//   };
// });
// const rrd = require('react-router-dom');
// jest.spyOn(rrd, 'useHistory').mockImplementation(() => ({
//     push: jest.fn(),
//   }));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn()
  })
}));

const mockUseLocationValue = {
  pathname: "/testroute",
  search: '',
  hash: '',
  state: null
}
jest.mock('react-router', () => ({
  ...jest.requireActual("react-router") as {},
  useLocation: jest.fn().mockImplementation(() => {
      return mockUseLocationValue;
  })
}));

describe('renders cars List page correctly', () => {
  afterEach(() => {    
    //jest.clearAllMocks();
  });

  test('loading when cars are not fetched', async() => {
    mockGet(0);

    const { getAllByTestId } = render(<CarsPage />);
    const CarSkeleton = await waitFor(() => getAllByTestId('CarSkeleton'));
    expect(CarSkeleton.length).toBe(10);
    jest.clearAllMocks();
  });

  test('loading when cars are not fetched', async() => {
    mockGet(getMockedCarList(1));
    render(<BrowserRouter><CarsPage /></BrowserRouter>);
    await waitFor(() => expect(screen.getByText(/Fiat1/)).toBeInTheDocument());
    jest.clearAllMocks();
  });

  
});


function mockGet(returnValue) {
  jest.spyOn(http, 'get').mockImplementation((url) => {
    console.log('url',url)
    return Promise.resolve(returnValue)
  });
} 

function getMockedCarList(count=1) {
  const cars = [];
  for(let i=1; i<=count; i++) {
    cars.push({
      "stockNumber":i,
      "manufacturerName":"Fiat"+i,
      "modelName":"M"+i,
      "color":"blue"+i,
      "mileage": {"number": "111"+i, "unit":"km"},
      "fuelType":"Petrol",
      "pictureUrl":`https://image${i}`
    })
  }
  return {
      data: {
        "cars": cars,
        "totalPageCount":100,
        "totalCarsCount":1000
      }
    }
}