import types from '../src/constants';
import { pointsList, inputValue, currentMapCenter } from '../src/store/reducers';

describe('move point', () => {
  it('0 to 3', () => {
    const oldState = [
      {
        name: 1,
        pos: [1, 2],
      },
      {
        name: 2,
        pos: [3, 4],
      },
      {
        name: 3,
        pos: [5, 6],
      },
      {
        name: 4,
        pos: [7, 8],
      },
    ];

    const action = {
      type: types.MOVE_POINT,
      oldPosition: 0,
      newPosition: 3,
    };

    const newState = [
      {
        name: 2,
        pos: [3, 4],
      },
      {
        name: 3,
        pos: [5, 6],
      },
      {
        name: 4,
        pos: [7, 8],
      },
      {
        name: 1,
        pos: [1, 2],
      },
    ];

    expect(pointsList(oldState, action)).toEqual(newState);
  });

  it('3 to 0', () => {
    const oldState = [
      {
        name: 1,
        pos: [1, 2],
      },
      {
        name: 2,
        pos: [3, 4],
      },
      {
        name: 3,
        pos: [5, 6],
      },
      {
        name: 4,
        pos: [7, 8],
      },
    ];

    const action = {
      type: types.MOVE_POINT,
      oldPosition: 3,
      newPosition: 0,
    };

    const newState = [
      {
        name: 4,
        pos: [7, 8],
      },
      {
        name: 1,
        pos: [1, 2],
      },
      {
        name: 2,
        pos: [3, 4],
      },
      {
        name: 3,
        pos: [5, 6],
      },
    ];

    expect(pointsList(oldState, action)).toEqual(newState);
  });

  it('3 to 1', () => {
    const oldState = [
      {
        name: 1,
        pos: [1, 2],
      },
      {
        name: 2,
        pos: [3, 4],
      },
      {
        name: 3,
        pos: [5, 6],
      },
      {
        name: 4,
        pos: [7, 8],
      },
    ];

    const action = {
      type: types.MOVE_POINT,
      oldPosition: 3,
      newPosition: 1,
    };

    const newState = [
      {
        name: 1,
        pos: [1, 2],
      },
      {
        name: 4,
        pos: [7, 8],
      },
      {
        name: 2,
        pos: [3, 4],
      },
      {
        name: 3,
        pos: [5, 6],
      },
    ];

    expect(pointsList(oldState, action)).toEqual(newState);
  });

  it('0 to 2', () => {
    const oldState = [
      {
        name: 1,
        pos: [1, 2],
      },
      {
        name: 2,
        pos: [3, 4],
      },
      {
        name: 3,
        pos: [5, 6],
      },
      {
        name: 4,
        pos: [7, 8],
      },
    ];

    const action = {
      type: types.MOVE_POINT,
      oldPosition: 0,
      newPosition: 2,
    };

    const newState = [
      {
        name: 2,
        pos: [3, 4],
      },
      {
        name: 3,
        pos: [5, 6],
      },
      {
        name: 1,
        pos: [1, 2],
      },
      {
        name: 4,
        pos: [7, 8],
      },
    ];

    expect(pointsList(oldState, action)).toEqual(newState);
  });
});

describe('add point', () => {
  it('add one point', () => {
    const oldState = [];

    const action = {
      type: types.ADD_POINT,
      point: { name: 'point 1', pos: [1, 2], address: 'Академика Королева' },
    };

    const newState = [{ name: 'point 1', pos: [1, 2], address: 'Академика Королева' }];

    expect(pointsList(oldState, action)).toEqual(newState);
  });
});

describe('delete point', () => {
  it('delete one point', () => {
    const oldState = [{ name: 'point 1', pos: [1, 2], address: 'Академика Королева' }];

    const action = {
      type: types.DELETE_POINT,
      pointId: 0,
    };

    const newState = [];

    expect(pointsList(oldState, action)).toEqual(newState);
  });
});

describe('update point coordinates and address', () => {
  it('update one point', () => {
    const oldState = [{ name: 'point 1', pos: [1, 2], address: 'Академика Королева' }];

    const action = {
      type: types.UPDATE_COORDINATES,
      changedPointIndex: 0,
      newCoords: [3, 4],
      newAddress: 'улица Николо-Ямская',
    };

    const newState = [{ name: 'point 1', pos: [3, 4], address: 'улица Николо-Ямская' }];

    expect(pointsList(oldState, action)).toEqual(newState);
  });
});

describe('update input value', () => {
  it('update', () => {
    const oldState = '';

    const action = {
      type: types.UPDATE_INPUT_VALUE,
      newValue: 'new Value',
    };

    const newState = 'new Value';

    expect(inputValue(oldState, action)).toEqual(newState);
  });
});

describe('update map center', () => {
  it('update', () => {
    const oldState = [55.76, 37.64];

    const action = {
      type: types.UPDATE_MAP_CENTER,
      newMapCenter: [55.36, 37.55],
    };

    const newState = [55.36, 37.55];

    expect(currentMapCenter(oldState, action)).toEqual(newState);
  });
});
