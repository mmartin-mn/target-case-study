import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { DepartureInfoList } from '../departure-info/DepartureInfoList';
import { ByRouteSelectors } from './ByRouteSelectors';

export const ByRoute = () => {
  const params = useParams<{ routeId: string, directionId: string, placeCode: string }>();
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (params.routeId && params.directionId !== '' && params.directionId !== undefined && params.placeCode) {
      setShowList(true);
    } else {
      setShowList(false);
    }
  }, [params])

  return (
    <div className="by-route-container">
      <ByRouteSelectors />
      {showList && <DepartureInfoList />}
    </div>
  );
}
