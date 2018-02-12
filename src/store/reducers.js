import C from '../constants';

const movePoint = (list, oldPosition, newPosition) => {
  const element = list[oldPosition];
  const newList = [...list];
  newList.splice(oldPosition, 1);
  const newList2 = [...newList];
  newList2.splice(newPosition, 0, element);
  const newList3 = [...newList2];
  return newList3;
};

const pointsList = (state = [], action) => {
  switch (action.type) {
    case C.ADD_POINT: {
      return [...state, action.point];
    }
    case C.MOVE_POINT: {
      return movePoint(state, action.oldPosition, action.newPosition);
    }
    case C.DELETE_POINT: {
      return state.filter((item, index) => index !== action.pointId);
    }
    case C.UPDATE_COORDINATES: {
      const newState = [...state];
      newState[action.changedPointIndex].pos = action.newCoords;
      newState[action.changedPointIndex].address = action.newAddress;
      return newState;
    }
    default:
      return state;
  }
};

const inputValue = (state = '', action) => {
  switch (action.type) {
    case C.UPDATE_INPUT_VALUE: {
      return action.newValue;
    }
    default:
      return state;
  }
};

const currentMapCenter = (state = [], action) => {
  switch (action.type) {
    case C.UPDATE_MAP_CENTER: {
      return action.newMapCenter;
    }
    default:
      return state;
  }
};

export { pointsList, inputValue, currentMapCenter };
