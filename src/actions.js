import C from './constants';

const addPoint = point => ({
  type: C.ADD_POINT,
  point,
});

const movePoint = (oldPosition, newPosition) => ({
  type: C.MOVE_POINT,
  oldPosition,
  newPosition,
});

const deletePoint = pointId => ({
  type: C.DELETE_POINT,
  pointId,
});

const updateInputValue = newValue => ({
  type: C.UPDATE_INPUT_VALUE,
  newValue,
});

const updateCoordinates = (changedPointIndex, newCoords, newAddress) => ({
  type: C.UPDATE_COORDINATES,
  changedPointIndex,
  newCoords,
  newAddress,
});

const updateMapCenter = newMapCenter => ({
  type: C.UPDATE_MAP_CENTER,
  newMapCenter,
});

export { addPoint, movePoint, deletePoint, updateInputValue, updateCoordinates, updateMapCenter };
