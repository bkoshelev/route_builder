import React from 'react';
import { Sortable } from '@shopify/draggable';

import './points_list.css';

export default class PointsList extends React.Component {
  componentDidMount = () => {
    const containerSelector = '.BlockLayout';
    const containers = document.querySelectorAll(containerSelector);
    if (containers.length === 0) {
      return false;
    }

    const swappable = new Sortable(containers, {
      draggable: '.Block--isDraggable',
      appendTo: containerSelector,
      mirror: {
        constrainDimensions: true,
        xAxis: false,
      },
    });

    swappable.on('sortable:stop', (event) => {
      this.props.movePoint(event.oldIndex, event.newIndex);
    });

    return swappable;
  };

  deletePoint = index => () => {
    this.props.deletePoint(index);
  };

  getPointsList = () => {
    const list = this.props.pointsList;
    const pointsList = list.map((item, index) => (
      <div key={index} className="Block--isDraggable list_row">
        <div
          className=""
          ref={(input) => {
            this.point1 = input;
          }}
        >
          {`${item.name} : ${item.address}`}
        </div>
        <svg
          onClick={this.deletePoint(index)}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M12 10.586L8.707 7.293a1 1 0 0 0-1.414 1.414L10.586 12l-3.293 3.293a1 1 0 0 0 1.414 1.414L12 13.414l3.293 3.293a1 1 0 0 0 1.414-1.414L13.414 12l3.293-3.293a1 1 0 1 0-1.414-1.414L12 10.586z"
          />
        </svg>
      </div>
    ));

    return pointsList;
  };

  shouldComponentUpdate = (nextProps) => {
    if (nextProps.pointsList.length !== this.props.pointsList.length) {
      return true;
    }

    const { length } = this.props.pointsList;
    const func = (index) => {
      if (index >= length) return false;
      const oldPoint = this.props.pointsList[index];
      const newPoint = nextProps.pointsList[index];
      if (oldPoint.name !== newPoint.name) {
        return 'moved';
      }
      return func(index + 1);
    };

    const isMovedOrAddressChanged = func(0);
    if (isMovedOrAddressChanged === 'moved') return false;
    return true;
  };

  render = () => {
    const list = this.getPointsList();
    return (
      <div id="points_list" className="BlockLayout">
        {list}
      </div>
    );
  };
}
