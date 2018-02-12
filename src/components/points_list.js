import React from "react";
import DragSortableList from "react-drag-sortable";

import "./points_list.css";

export default class PointsList extends React.Component {
  deletePoint = index => () => {
    this.props.deletePoint(index);
  };

  getPointsList = () => {
    const list = this.props.pointsList;
    const pointsList = list.map((item, index) => ({
      content: (
        <div key={index} id={index} className="Block--isDraggable list_row">
          <div
            className=""
            ref={input => {
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
      ),
      classes: []
    }));

    return pointsList;
  };

  render = () => {
    const list = this.getPointsList();
    return (
      <div id="points_list" className="BlockLayout">
        <DragSortableList
          items={list}
          placeholder={<div id="placeholder" />}
          moveTransitionDuration={0.5}
          dropBackTransitionDuration={0.3}
          type="vertical"
          onSort={(sortedList, dropEvent) => {
            const oldPos = dropEvent.currentTarget.children[0].id;
            const newPos =
              dropEvent.currentTarget.attributes["data-rank"].value;
            this.props.movePoint(oldPos, newPos);
          }}
        />
      </div>
    );
  };
}
