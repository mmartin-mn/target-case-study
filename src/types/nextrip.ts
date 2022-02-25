export interface Route {
  route_id: string;
  agency_id: string;
  route_label: string;
}

export interface Direction {
  direction_id: number;
  direction_name: string;
}

export interface Stop {
  place_code: string;
  description: string;
}

export interface DepartureInfo {
  stops: StopInfo[];
  alerts: Alert[];
  departures: Departure[];
}

export interface StopInfo {
  stop_id: number;
  latitude: number;
  longitude: number;
  description: string;
}

interface Alert {
  stop_closed: boolean;
  alert_text: string;
}

export interface Departure {
  actual: boolean;
  trip_id: string;
  stop_id: number;
  departure_text: string;
  departure_time: number;
  description: string;
  gate: string;
  route_id: string;
  route_short_name: string;
  direction_id: number;
  direction_text: string;
  schedule_relationship: string;
  terminal?: string;
}
