import React from 'react';
import { AddNewPointConnect, PointsListConnect, MapConnect } from '../contaners';
import './route_builder.css';

export default class RouteBuilder extends React.Component {
  render = () => (
    <div id="route_builder">
      <div id="control">
        <div id="control_elements">
          <div id="header" className="text">
            Маршрут
          </div>
          <AddNewPointConnect />
          <PointsListConnect />
        </div>
      </div>
      <MapConnect />
    </div>
  );
}
