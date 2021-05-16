import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CarsPage from '../pages/CarsPage';
import { BrowserRouter } from 'react-router-dom';
import { getMockedCarList, mockGet } from '../__mocks__/mock';

/* Mocks - to be moved to other file */
jest.mock("../components/Filter/Filter", () => {
  return () => null
});

jest.mock("../hooks/useQuery", () => {
  return (p) => p
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
  
  test('loading when cars are not fetched', async() => {
    mockGet(0);

    const { getAllByTestId } = render(<CarsPage />);
    
    const CarSkeleton = await waitFor(() => getAllByTestId('CarSkeleton'));
    
    expect(CarSkeleton.length).toBe(10);
    
  });

  test('loading when cars are not fetched', async() => {
    mockGet(getMockedCarList(1));
    
    render(<BrowserRouter><CarsPage /></BrowserRouter>);
    
    await waitFor(() => expect(screen.getByText(/Fiat1/)).toBeInTheDocument());
  });
});

