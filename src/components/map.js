import React from 'react';
import './route_builder.css';

export default class Map extends React.Component {
  deepCompareCoordinates = (list1, list2) => {
    if (list1.length !== list2.length) return false;
    return this.getChangedPointIndex(list1, list2) === false;
  };

  getChangedPointIndex = (list1, list2) => {
    if (list1.length !== list2.length) return false;
    const { length } = list1;
    const isCompare = (index) => {
      if (index >= length) {
        return false;
      }
      const x1 = list1[index][0];
      const x2 = list2[index][0];
      const y1 = list1[index][1];
      const y2 = list2[index][1];
      return x1 === x2 && y1 === y2 ? isCompare(index + 1) : index;
    };
    return isCompare(0);
  };

  moscowMap;
  componentDidMount = () => {
    window.ymaps.ready(() => {
      this.moscowMap = new window.ymaps.Map('map', {
        center: [55.76, 37.64],
        zoom: 10,
        controls: [],
      });

      this.moscowMap.events.add('boundschange', (event) => {
        this.props.updateMapCenter(event.get('newCenter'));
      });

      const getPointName = index => this.props.pointsList[index].name;
      const getPointNameHere = getPointName.bind(this);

      const newPolyline = new window.ymaps.Polyline(
        [],
        {},
        {
          strokeColor: '#00000088',
          strokeWidth: 4,
          editorMaxPoints: 0,
          editorDblClickHandler: () => {},
          editorMenuManager(items, model) {
            const map = model.editor.geometry._map;
            map.balloon.close();
            const pointCoords = model.geometry.getCoordinates();
            const pointName = getPointNameHere(model._index);
            map.balloon.open(pointCoords, { contentBody: pointName });
            return [];
          },
        },
      );

      this.moscowMap.geoObjects.add(newPolyline);
      newPolyline.editor.startEditing();
      newPolyline.geometry.events.add('change', async (event) => {
        this.moscowMap.balloon.close();
        const oldCoords = event.get('oldCoordinates');
        const newCoords = event.get('newCoordinates');
        if (
          oldCoords.length === newCoords.length &&
          !this.deepCompareCoordinates(oldCoords, newCoords)
        ) {
          const changedPointIndex = this.getChangedPointIndex(oldCoords, newCoords);
          const myReverseGeocoder = await window.ymaps.geocode(newCoords[changedPointIndex], {
            json: true,
          });
          const address =
            myReverseGeocoder.GeoObjectCollection.featureMember.length !== 0
              ? myReverseGeocoder.GeoObjectCollection.featureMember[0].GeoObject.name
              : '';
          this.props.updateCoordinates(changedPointIndex, newCoords[changedPointIndex], address);
        }
      });
    });
  };

  getProps = () => this.props;

  componentWillUpdate = (nextProps) => {
    const polylinePoints = this.moscowMap.geoObjects.get(0).geometry;
    const newList = nextProps.pointsList.map(item => item.pos);
    polylinePoints.setCoordinates(newList);
  };

  render = () => (
    <div>
      <div id="map" style={{ width: '450px', height: '400px' }} />
    </div>
  );
}
