import { connect } from 'react-redux';
import AddNewPoint from './components/add_new_point';
import PointsList from './components/points_list';
import Map from './components/map';

import {
  addPoint,
  movePoint,
  deletePoint,
  updateInputValue,
  updateCoordinates,
  updateMapCenter,
} from './actions';

const AddNewPointConnect = connect(
  state => ({
    inputValue: state.inputValue,
    currentMapCenter: state.currentMapCenter,
  }),
  dispatch => ({
    addPoint(point) {
      dispatch(addPoint(point));
    },
    updateInputValue(newValue) {
      dispatch(updateInputValue(newValue));
    },
  }),
)(AddNewPoint);

const MapConnect = connect(
  state => ({
    pointsList: state.pointsList,
  }),
  dispatch => ({
    updateCoordinates(changedPointIndex, newCoords, newAddress) {
      dispatch(updateCoordinates(changedPointIndex, newCoords, newAddress));
    },
    updateMapCenter(newMapCenter) {
      dispatch(updateMapCenter(newMapCenter));
    },
  }),
)(Map);

const PointsListConnect = connect(
  state => ({
    pointsList: state.pointsList,
  }),
  dispatch => ({
    deletePoint(pointId) {
      dispatch(deletePoint(pointId));
    },
    movePoint(oldPosition, newPosition) {
      dispatch(movePoint(oldPosition, newPosition));
    },
  }),
)(PointsList);

export { AddNewPointConnect, MapConnect, PointsListConnect };
