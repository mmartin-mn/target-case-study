import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownChangeParams } from 'primereact/dropdown';
import { useNavigate  } from 'react-router-dom';

import { getRouteDirections, getRoutes, getStops } from '../query/nextrip';
import { Direction, Route, Stop } from '../types/nextrip';
import './ByRouteSelectors.scss';

export const ByRouteSelectors = () => {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRoute, setSelectedRoute] = useState('');
  const [directions, setDirections] = useState<Direction[]>([]);
  const [selectedDirection, setSelectedDirection] = useState<number>();
  const [stops, setStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getRouteData = async () => {
      try {
        const routeData = await getRoutes();
        setRoutes(routeData);
        setError('');
      } catch(e) {
        setError('We could not get routes, please refresh to try again.');
      }

    }

    getRouteData();
  }, []) // Only run on mount of the component

  useEffect(() => {
    const getDirectionData = async () => {
      try {
        const directionData = await getRouteDirections(selectedRoute);
        setDirections(directionData);
        setError('');
      } catch (e) {
        setError('We could not get directions, please refresh to try again.');
      }
    }

    // We don't want to make the api call to get directions if there is not a selected route
    if(selectedRoute !== '') {
      getDirectionData();
    }

    // Every time the route changes, we want to clear the selected direction and the selected stop
    setSelectedDirection(undefined);
    setSelectedStop('');
  }, [selectedRoute]) // We need to get new directions every time the route changes

  useEffect(() => {
    const getStopsData = async () => {
      try {
        // Typescript doesn't like this as it's a value that could be undefined, but
        // I am just going to type cast since I'm pretty sure it's going to be a number here and NOT undefined
        // As I check for that below
        const stopData = await getStops(selectedRoute, selectedDirection as number);
        setStops(stopData);
        setError('');
      } catch (e) {
        setError('We could not get stops, please refresh to try again.');
      }

    }

    // We don't want to make the api call if there is not a selected direction
    if(selectedDirection !== undefined) {
      getStopsData();
    }

    // Every time the direction changes, we want to clear the selected stop
    setSelectedStop('');
  }, [selectedDirection, selectedRoute])  // We need to get new stops every time the directions changes

  const onRouteSelected = (event: DropdownChangeParams) => {
    setSelectedRoute(event.value);
  }

  const onDirectionSelected = (event: DropdownChangeParams) => {
    setSelectedDirection(event.value);
  }

  const onStopSelected = (event: DropdownChangeParams) => {
    setSelectedStop(event.value);
    // Want to also navigate on selected stop, so that the URL updates with the correct data
    navigate(`/${selectedRoute}/${selectedDirection}/${event.value}`);
  }

  return (
    <div className='route-selectors-container p-d-flex p-flex-column'>
      <Dropdown className='selector p-mb-3' value={selectedRoute} options={routes} onChange={onRouteSelected} placeholder="Select a route" optionLabel="route_label" optionValue="route_id" />
      {selectedRoute && <Dropdown className='selector p-mb-3' value={selectedDirection} options={directions} onChange={onDirectionSelected} placeholder="Select a direction" optionLabel="direction_name" optionValue="direction_id" />}
      {selectedDirection !== undefined && <Dropdown className='selector' value={selectedStop} options={stops} onChange={onStopSelected} placeholder="Select a stop" optionLabel="description" optionValue="place_code" />}
      {error && <div className='p-text-bold p-error'>{error}</div>}
    </div>
  );
}
