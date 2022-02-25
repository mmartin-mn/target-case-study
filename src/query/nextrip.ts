import { DepartureInfo, Direction, Route, Stop } from "../types/nextrip";

const baseUrl = "https://svc.metrotransit.org/nextripv2";
const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getRoutes = async (): Promise<Route[]> => {
  const response = await fetch(`${baseUrl}/routes`, options);

  if (!response.ok) {
    throw new Error("Could not get routes");
  }

  return response.json();
};

export const getRouteDirections = async (
  routeId: string
): Promise<Direction[]> => {
  const response = await fetch(`${baseUrl}/directions/${routeId}`, options);

  if (!response.ok) {
    throw new Error("Could not get directions");
  }

  return response.json();
};

export const getStops = async (
  routeId: string,
  directionId: number
): Promise<Stop[]> => {
  const response = await fetch(
    `${baseUrl}/stops/${routeId}/${directionId}`,
    options
  );

  if (!response.ok) {
    throw new Error("Could not get stops");
  }

  return response.json();
};

export const getDepartureInfo = async (
  routeId: string,
  directionId: number,
  place_code: string
): Promise<DepartureInfo> => {
  const response = await fetch(
    `${baseUrl}/${routeId}/${directionId}/${place_code}`,
    options
  );

  if (!response.ok) {
    throw new Error("Could not get depatures");
  }

  return response.json();
};
