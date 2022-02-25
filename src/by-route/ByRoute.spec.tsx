import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import Router, { BrowserRouter } from 'react-router-dom';
import { ByRoute } from './ByRoute';

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
 }));

jest.mock('./ByRouteSelectors', () => ({
  ByRouteSelectors: () => <div>ByRouteSelectors</div>
}));

jest.mock('../departure-info/DepartureInfoList', () => ({
  DepartureInfoList: () => <div>DepartureInfoList</div>
}));

describe('ByRoute', () => {
  describe('there is not a routeId', () => {
    beforeEach(() => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: undefined, directionId: '1', placeCode: 'def' })
    });
    
    it('should not show the list', () => {
      const { queryByText } = render(<ByRoute />, { wrapper: BrowserRouter });

      expect(queryByText('DepartureInfoList')).toBeNull();
    });
  });

  describe('there is not a directionId', () => {
    beforeEach(() => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: undefined, placeCode: 'def' })
    });

    it('should not show the list', () => {
      const { queryByText } = render(<ByRoute />, { wrapper: BrowserRouter });

      expect(queryByText('DepartureInfoList')).toBeNull();
    });
  });

  describe('directionId is empty', () => {
    beforeEach(() => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: '', placeCode: 'def' })
    });

    it('should not show the list', () => {
      const { queryByText } = render(<ByRoute />, { wrapper: BrowserRouter });

      expect(queryByText('DepartureInfoList')).toBeNull();
    });
  });

  describe('there is not a placeCode', () => {
    beforeEach(() => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: '1', placeCode: undefined })
    });

    it('should not show the list', () => {
      const { queryByText } = render(<ByRoute />, { wrapper: BrowserRouter });

      expect(queryByText('DepartureInfoList')).toBeNull();
    });
  });

  describe('there is a routeId, directionId, and placeCode', () => {
    beforeEach(() => {
      jest.spyOn(Router, 'useParams').mockReturnValue({ routeId: 'abc', directionId: '1', placeCode: 'def' })
    });

    it('should render the component', () => {
      const { getByText } = render(<ByRoute />, { wrapper: BrowserRouter });
  
      expect(getByText('ByRouteSelectors')).toBeInTheDocument();
    });

    it('should show the list', () => {
      const { getByText } = render(<ByRoute />, { wrapper: BrowserRouter });

      expect(getByText('DepartureInfoList')).toBeInTheDocument();
    });
  });
});
