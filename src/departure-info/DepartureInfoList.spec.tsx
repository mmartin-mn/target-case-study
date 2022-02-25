import React from 'react';
import { render } from '@testing-library/react';
import Router, { BrowserRouter } from 'react-router-dom';
import * as query from '../query/nextrip';
import { DepartureInfoList } from './DepartureInfoList';
import { DepartureInfo as DepartureInfoType } from '../types/nextrip';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
 }));

jest.mock('./DepartureInfo', () => ({
  DepartureInfo: () => <div>DepartureInfo</div>
}));

const departureInfo: DepartureInfoType = {
  stops: [{
    stop_id: 123,
    latitude: 456,
    longitude: 789,
    description: 'Stop Description',
  }, {
    stop_id: 234,
    latitude: 567,
    longitude: 890,
    description: 'Stop Description 2',
  }],
  alerts: [],
  departures: [{
    actual: true,
    trip_id: 'trip_id_1',
    stop_id: 0,
    departure_text: 'Departure Text 1',
    departure_time: 1645732187,
    description: 'Description 1',
    gate: 'Gate 1',
    route_id: 'route_id_1',
    route_short_name: 'Short 1',
    direction_id: 0,
    direction_text: 'Direction 1',
    schedule_relationship: 'Schedule Relationship 1',
  }, {
    actual: true,
    trip_id: 'trip_id_2',
    stop_id: 0,
    departure_text: 'Departure Text 2',
    departure_time: 1645732187,
    description: 'Description 2',
    gate: 'Gate 2',
    route_id: 'route_id_2',
    route_short_name: 'Short 2',
    direction_id: 0,
    direction_text: 'Direction 2',
    schedule_relationship: 'Schedule Relationship 2',
  }]
};

describe('DepartureInfo', () => {
  describe('there is not an api error', () => {
    beforeEach(() => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: '1', placeCode: 'def' });
      // @ts-ignore
      query.getDepartureInfo = jest.fn().mockImplementation(() => Promise.resolve(departureInfo));
    });

    it('should render the stop info in the header', async () => {
      const { findByText, getByText } = render(<DepartureInfoList />, { wrapper: BrowserRouter });

      expect(await findByText(departureInfo.stops[0].description)).toBeInTheDocument();
      expect(getByText(`Stop #: ${departureInfo.stops[0].stop_id}`)).toBeInTheDocument();
    });

    describe('there are not departures to list', () => {
      beforeEach(() => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: '1', placeCode: 'def' });
        // @ts-ignore
        query.getDepartureInfo = jest.fn().mockImplementation(() => Promise.resolve({
          ...departureInfo,
          departures: []
        }));
      });

      it('should show the empty list text', async () => {
        const { findByText } = render(<DepartureInfoList />, { wrapper: BrowserRouter });

        expect(await findByText('There are no depatrues at this time.')).toBeInTheDocument();
      });
    });

    describe('there are departures to list', () => {
      beforeEach(() => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: '1', placeCode: 'def' });
        // @ts-ignore
        query.getDepartureInfo = jest.fn().mockImplementation(() => Promise.resolve(departureInfo));
      });

      it('should render the departures', async () => {
        const { findAllByText } = render(<DepartureInfoList />, { wrapper: BrowserRouter });

        const departures = await findAllByText('DepartureInfo')

        expect(departures.length).toEqual(2);
      });
    });
  });

  describe('the api call is never actually made', () => {
    describe('there is not a routeId', () => {
      beforeEach(() => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: undefined, directionId: '1', placeCode: 'def' });
      });

      it('should show the empty list text', () => {
        const { getByText } = render(<DepartureInfoList />, { wrapper: BrowserRouter });

        expect(getByText('There are no depatrues at this time.')).toBeInTheDocument();
      });
    });

    describe('there is not a directionId', () => {
      beforeEach(() => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: undefined, placeCode: 'def' });
      });

      it('should show the empty list text', () => {
        const { getByText } = render(<DepartureInfoList />, { wrapper: BrowserRouter });

        expect(getByText('There are no depatrues at this time.')).toBeInTheDocument();
      });
    });

    describe('there is not a placeCode', () => {
      beforeEach(() => {
        jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: '1', placeCode: undefined });
      });

      it('should show the empty list text', () => {
        const { getByText } = render(<DepartureInfoList />, { wrapper: BrowserRouter });

        expect(getByText('There are no depatrues at this time.')).toBeInTheDocument();
      });
    });
  });

  describe('there is an api error', () => {
    beforeEach(() => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: '1', placeCode: 'def' });
      // @ts-ignore
      query.getDepartureInfo = jest.fn().mockImplementation(() => Promise.reject('Error Message'));
    });

    it('should show the error text', async () => {
      const error = 'Could not get depatures. Please check the route, direction, and stop IDs and refresh to try again.';
      const { findByText } = render(<DepartureInfoList />, { wrapper: BrowserRouter });

      expect(await findByText(error)).toBeInTheDocument();
    });
  });
});
