import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CarsPage from '../pages/CarsPage';
import { BrowserRouter } from 'react-router-dom';
import { getMockedCarList, mockGet } from '../__mocks__/mock';
import http from '../utils/http';
import * as useQuery from '../hooks/useQuery';

/* Mocks - to be moved to other file */
jest.mock("../components/Filter/Filter", () => {
  return () => null
});



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
/* Mocks - to be moved to other file */


describe('renders cars List page correctly', () => {
  
  beforeEach(() => {
    jest.spyOn(useQuery, 'default').mockImplementation((item: string) => item);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('loading when cars are not fetched', async() => {
    mockGet(0);

    const { getAllByTestId } = render(<CarsPage />);
    
    const CarSkeleton = await waitFor(() => getAllByTestId('CarSkeleton'));
    
    expect(CarSkeleton.length).toBe(10);
    
  });

  test('Show data when cars are fetched', async() => {
    mockGet(getMockedCarList(1));
    
    render(<BrowserRouter><CarsPage /></BrowserRouter>);
    
    await waitFor(() => expect(screen.getByText(/Fiat1/)).toBeInTheDocument());
  });

  test('Show correct data when use paginates is clicked', async() => {
    mockGet(getMockedCarList(10));
    
    const { getByText } = render(<BrowserRouter><CarsPage /></BrowserRouter>);
    
    await waitFor(() => expect(getByText(/Fiat1 M1/)).toBeInTheDocument());

    expect(getByText(/Next/)).toBeInTheDocument();
    fireEvent.click(getByText(/Next/))
    await waitFor(() => expect(getByText(/Showing 20 of 1000 results/)).toBeInTheDocument());
    expect(getByText(/2 of 100/)).toBeInTheDocument()

    fireEvent.click(getByText(/Last/))
    await waitFor(() => expect(getByText(/Showing 1000 of 1000 results/)).toBeInTheDocument());
    expect(getByText(/100 of 100/)).toBeInTheDocument()

    fireEvent.click(getByText(/First/))
    await waitFor(() => expect(getByText(/Showing 10 of 1000 results/)).toBeInTheDocument());
    expect(getByText(/1 of 100/)).toBeInTheDocument()
  });

  test('Show correct data when filter data is passed via url', async() => {

    jest.spyOn(useQuery, 'default').mockImplementation((item: string) => {
        return item === 'color' ? 'red' : (item === 'manufacturer') ? 'Audi' : item
    });

    const httpMockGet = mockGet(getMockedCarList(5));
    const { getByText } = render(<BrowserRouter><CarsPage /></BrowserRouter>);
    
    await waitFor(() => expect(httpMockGet).toHaveBeenCalledWith('/cars?color=red&manufacturer=Audi&page=1'));
    
  });
});

