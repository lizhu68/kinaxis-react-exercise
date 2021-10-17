import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";

test("full app rendering/navigating", () => {
  const history = createMemoryHistory();
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  // verify page content for expected route
  expect(screen.getByText(/Best Parking Finder/i)).toBeInTheDocument();

  const goHomeLink = document.querySelector("#navbar-brand");
  userEvent.click(screen.getByText(/find ottawa parking/i), goHomeLink);

  // check that the content changed to the new page
  expect(screen.getByText(/Top 3 locations/i)).toBeInTheDocument();
});

test("landing on a bad page", () => {
  const history = createMemoryHistory();
  history.push("/some/bad/route");
  render(
    <Router history={history}>
      <App />
    </Router>
  );
  expect(screen.getByText(/not found/i)).toBeInTheDocument();
});
