import React from 'react';
import './add_new_point.css';

export default class AddNewPoint extends React.Component {
  handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      const name = this.props.inputValue;
      const pos = this.props.currentMapCenter;

      const myReverseGeocoder = await window.ymaps.geocode(pos, { json: true });
      const address =
        myReverseGeocoder.GeoObjectCollection.featureMember.length !== 0
          ? myReverseGeocoder.GeoObjectCollection.featureMember[0].GeoObject.name
          : '';
      this.props.addPoint({ name, pos, address });
      this.props.updateInputValue('');
    }
  };

  updateValue = (event) => {
    this.props.updateInputValue(event.target.value);
  };

  render = () => (
    <div id="add_point">
      <input
        type="text"
        size="40"
        maxLength="25"
        value={this.props.inputValue}
        onChange={this.updateValue}
        onKeyPress={this.handleKeyPress}
        placeholder={'Введите название новой точки'}
      />
    </div>
  );
}
