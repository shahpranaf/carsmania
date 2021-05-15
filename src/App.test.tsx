import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter, Router } from 'react-router';
import { useHistory } from 'react-router-dom';
import { createMemoryHistory } from 'history'

jest.mock("./pages/CarPage", () => () => <h1>Car 123</h1>);
jest.mock("./pages/CarsPage", () => () => <h1>Available Cars</h1>);


const reactRouterDom = require("react-router-dom")
reactRouterDom.BrowserRouter = ({children}) => <div>{children}</div>


// jest.mock('react-router-dom', () => ({
//   useHistory: () => ({
//     push: jest.fn(),
//   }),
// }));

fdescribe("App", () => {
  test("Renders CarsPage with Header and footer for path '/cars'", () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={["/cars"]}>
          <App />
        </MemoryRouter>
      )
      expect(getByText(/Purchase/)).toBeInTheDocument()
      expect(getByText(/PANNA Group 2018/)).toBeInTheDocument()
      expect(getByText(/Available Cars/)).toBeInTheDocument();
  })

  test("Renders CarPage with Header and footer for path '/car/123'", () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={["/car/2"]}>
        <App />
      </MemoryRouter>
    )
    expect(getByText(/Purchase/)).toBeInTheDocument();
    expect(getByText(/PANNA Group 2018/)).toBeInTheDocument();
    expect(getByText(/Car 123/)).toBeInTheDocument();
  })
})
