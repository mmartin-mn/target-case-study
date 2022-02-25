import React from 'react';
import { render } from '@testing-library/react';
import { DepartureInfo, DepartureInfoProps } from './DepartureInfo';

describe('DepartureInfo', () => {
  let props: DepartureInfoProps;
  beforeEach(() => {
    props = {
      departure: {
        actual: true,
        trip_id: 'trip_id',
        stop_id: 0,
        departure_text: 'Departure Text',
        departure_time: 1645732187,
        description: 'Description',
        gate: 'Gate',
        route_id: 'route_id',
        route_short_name: 'Short',
        direction_id: 0,
        direction_text: 'Direction',
        schedule_relationship: 'Schedule Relationship',
      }
    }
  });

  it('should render the departure info', () => {
    const { getByText } = render(<DepartureInfo {...props} />);

    const route = getByText(props.departure.route_short_name);
    const destination = getByText(props.departure.description);
    const depart = getByText(props.departure.departure_text);

    expect(route).toBeInTheDocument();
    expect(destination).toBeInTheDocument();
    expect(depart).toBeInTheDocument();
  });

  describe('there is a terminal', () => {
    beforeEach(() => {
      props.departure.terminal = 'Terminal';
    })

    it('should render the ternimal with the route', () => {
      const { getByText } = render(<DepartureInfo {...props} />);

      const route = getByText(`${props.departure.route_short_name}${props.departure.terminal}`);
      const destination = getByText(props.departure.description);
      const depart = getByText(props.departure.departure_text);
  
      expect(route).toBeInTheDocument();
      expect(destination).toBeInTheDocument();
      expect(depart).toBeInTheDocument();
    });
  });
});
