import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ByRouteSelectors } from './ByRouteSelectors';
import * as query from '../query/nextrip';
import { Direction, Route, Stop } from '../types/nextrip';

const routes: Route[] = [{
  route_id: 'test_route_1',
  agency_id: 'test_agency',
  route_label: 'Route 1',
}, {
  route_id: 'test_route_2',
  agency_id: 'test_agency',
  route_label: 'Route 2',
}];

const directions: Direction[] = [{
  direction_id: 0,
  direction_name: 'North',
}, {
  direction_id: 1,
  direction_name: 'South',
}];

const stops: Stop[] = [{
  place_code: 'place_code_1',
  description: 'Stop 1',
}, {
  place_code: 'place_code_2',
  description: 'Stop 2',
}];

describe('ByRouteSelectors', () => {
  it('should render the component', () => {
    const { getAllByText } = render(<ByRouteSelectors />, { wrapper: BrowserRouter })

    expect(getAllByText('Select a route').length).toBeGreaterThan(0);
  });

  describe('the user goes through the happy path', () => {
    beforeEach(() => {
      // @ts-ignore
      query.getRoutes = jest.fn().mockImplementation(() => Promise.resolve(routes));
      // @ts-ignore
      query.getRouteDirections = jest.fn().mockImplementation(() => Promise.resolve(directions));
      // @ts-ignore
      query.getStops = jest.fn().mockImplementation(() => Promise.resolve(stops));
    });

    describe('the user selects a route', () => {
      it('the direction selector appears', async () => {
        const { getAllByText, findByText } = render(<ByRouteSelectors />, { wrapper: BrowserRouter })
  
        const dropdown = getAllByText('Select a route')[0];
  
        fireEvent.click(dropdown);
  
        fireEvent.click(await findByText('Route 1'));
  
  
        expect(getAllByText('Select a direction').length).toBeGreaterThan(0);
      });
    });

    describe('the user selects a direction', () => {
      it('the stop selector appears', async () => {
        const { getAllByText, findByText } = render(<ByRouteSelectors />, { wrapper: BrowserRouter })
  
        const routeDropdown = getAllByText('Select a route')[0];
  
        fireEvent.click(routeDropdown);
  
        fireEvent.click(await findByText('Route 1'));

        const directionDropdown = getAllByText('Select a direction')[0];
  
        fireEvent.click(directionDropdown);
  
        fireEvent.click(await findByText('North'));
  
        expect(getAllByText('Select a stop').length).toBeGreaterThan(0);
      });
    });

    
    describe('the user selects a stop', () => {
      it('the url should change', async () => {
        const { getAllByText, findByText } = render(<ByRouteSelectors />, { wrapper: BrowserRouter })
  
        const routeDropdown = getAllByText('Select a route')[0];
  
        fireEvent.click(routeDropdown);
  
        fireEvent.click(await findByText('Route 1'));

        const directionDropdown = getAllByText('Select a direction')[0];
  
        fireEvent.click(directionDropdown);
  
        fireEvent.click(await findByText('North'));

        const stopDropdown = getAllByText('Select a stop')[0];
  
        fireEvent.click(stopDropdown);
  
        fireEvent.click(await findByText('Stop 1'));
  
        expect(window.location.pathname).toEqual('/test_route_1/0/place_code_1');
      });
    });
  });

  describe('the user gets an error', () => {
    describe('there is an error getting routes', () => {
      beforeEach(() => {
        // @ts-ignore
        query.getRoutes = jest.fn().mockImplementation(() => Promise.reject('Error Message'));
      });

      it('the should display the route error message', async () => {
        const { findByText } = render(<ByRouteSelectors />, { wrapper: BrowserRouter })
  
        expect(await findByText('We could not get routes, please refresh to try again.')).toBeInTheDocument();
      });
    });

    describe('there is an error getting directions', () => {
      beforeEach(() => {
        // @ts-ignore
        query.getRoutes = jest.fn().mockImplementation(() => Promise.resolve(routes));
        // @ts-ignore
        query.getRouteDirections = jest.fn().mockImplementation(() => Promise.reject('Error Message'));
      });

      it('the should display the route error message', async () => {
        const { getAllByText, findByText } = render(<ByRouteSelectors />, { wrapper: BrowserRouter });

        const routeDropdown = getAllByText('Select a route')[0];
  
        fireEvent.click(routeDropdown);
  
        fireEvent.click(await findByText('Route 1'));
  
        expect(await findByText('We could not get directions, please refresh to try again.')).toBeInTheDocument();
      });
    });

    describe('there is an error getting stops', () => {
      beforeEach(() => {
        // @ts-ignore
        query.getRoutes = jest.fn().mockImplementation(() => Promise.resolve(routes));
        // @ts-ignore
        query.getRouteDirections = jest.fn().mockImplementation(() => Promise.resolve(directions));
        // @ts-ignore
        query.getStops = jest.fn().mockImplementation(() => Promise.reject('Error Message'));
      });

      it('the should display the route error message', async () => {
        const { getAllByText, findByText } = render(<ByRouteSelectors />, { wrapper: BrowserRouter });

        const routeDropdown = getAllByText('Select a route')[0];
  
        fireEvent.click(routeDropdown);
  
        fireEvent.click(await findByText('Route 1'));

        const directionDropdown = getAllByText('Select a direction')[0];
  
        fireEvent.click(directionDropdown);
  
        fireEvent.click(await findByText('North'));
  
        expect(await findByText('We could not get stops, please refresh to try again.')).toBeInTheDocument();
      });
    });
  })
});

