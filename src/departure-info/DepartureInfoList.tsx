import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from 'primereact/divider';
import { getDepartureInfo } from '../query/nextrip';
import { Departure, StopInfo } from '../types/nextrip';
import { DepartureInfo } from './DepartureInfo';
import './DepartureInfoList.scss';

export const DepartureInfoList = () => {
  const params = useParams<{ routeId: string, directionId: string, placeCode: string }>();
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedDirection, setSelectedDirection] = useState<number>();
  const [selectedPlaceCode, setSelectedPlaceCode] = useState('');
  const [departures, setDepatures] = useState<Departure[]>([]);
  const [stop, setStop] = useState<StopInfo>();
  const [error, setError] = useState('');

  useEffect(() => {
    // On change of params, grab the info from the params
    // If there is not a full list of params, then don't grab info
    if (params.routeId && params.directionId && params.placeCode) {
      setSelectedRoute(params.routeId);
      setSelectedDirection(+params.directionId);
      setSelectedPlaceCode(params.placeCode);
    }
  }, [params])

  useEffect(() => {
    const getDepartures = async () => {
      try {
        // Typecasting selectedDirection, as we are pretty sure it is not undefined because of the check below
        // It is needed because typescript complains otherwise
        const returnData = await getDepartureInfo(selectedRoute, selectedDirection as number, selectedPlaceCode);
        setDepatures(returnData.departures);
        // I don't know the business reasons on why this is an array, but from what I can tell we only care about the first stop
        setStop(returnData.stops[0]);
        setError('');
      } catch (e) {
        setError('Could not get depatures. Please check the route, direction, and stop IDs and refresh to try again.');
      }
    }

    // First make sure we have all the info we need
    if (selectedRoute && selectedDirection !== undefined && selectedPlaceCode) {
      getDepartures();
    }
  }, [selectedRoute, selectedDirection, selectedPlaceCode]);

  if (!error) {
    return (
      <div className="departure-list-container p-mt-3">
        <div className="title-container p-d-flex p-ai-center p-jc-between p-px-3">
          <h2 className="p-mr-3">{stop?.description}</h2>
          <p>Stop #: {stop?.stop_id}</p>
        </div>
        <div className="info-header p-d-flex p-px-3 p-text-bold">
          <p className="route-header">Route</p>
          <p className="destination-header">Destination</p>
          <p className="departs-header">Departs</p>
        </div>
        {departures.length > 0 ? <div className="depature-list">
          {departures.map((departure, i) => (
            <div key={i}>
              <DepartureInfo departure={departure} />
              <Divider />
            </div>
          ))}
        </div> : <div className="p-py-3 p-d-flex p-jc-center p-text-bold">
          There are no depatrues at this time.
        </div>}
      </div>
    );
  } else {
    return <div className='p-text-bold p-error'>{error}</div>
  }
}
