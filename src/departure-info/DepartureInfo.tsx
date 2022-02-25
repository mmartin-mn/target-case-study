import React from 'react';
import { Departure } from '../types/nextrip';
import './DepartureInfo.scss';

export interface DepartureInfoProps {
  departure: Departure
}

export const DepartureInfo = ({ departure }: DepartureInfoProps) => {
  const routeText = departure.terminal ? `${departure.route_short_name}${departure.terminal}` : departure.route_short_name

  return <div className="departure-info-container p-d-flex p-px-3">
    <span className="route p-text-bold">{routeText}</span> 
    <span className="destination">{departure.description}</span> 
    <span className="departs p-text-bold">{departure.departure_text}</span>
  </div>
}