import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router';

/* Mocks - to be moved to some common place */
jest.mock("./pages/CarPage", () => () => <h1>Car 123</h1>);
jest.mock("./pages/CarsPage", () => () => <h1>Available Cars</h1>);

const reactRouterDom = require("react-router-dom")
reactRouterDom.BrowserRouter = ({children}) => <div>{children}</div>
/* Mocks - to be moved to some common place */

describe("App", () => {
  test("Renders CarsPage with Header and footer for path '/cars'", () => {
      const { getByText } = render(
        <MemoryRouter initialEntries={["/cars"]}>
          <App />
        </MemoryRouter>
      )
      expect(getByText(/Purchase/)).toBeInTheDocument()
      expect(getByText(/PANNA Group 2018/)).toBeInTheDocument()
      expect(getByText(/Available Cars/)).toBeInTheDocument();
      jest.clearAllMocks();
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
    jest.clearAllMocks();
  })
})
