import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

import { fetchCars } from '../actions/index';
import SidePanel from '../components/side_panel';

class CarsIndex extends Component {

  componentWillMount() {
    this.fetchCars();
  };

  componentDidMount() {
    this.refresher = setInterval(function() {
      this.fetchCars
    }, 5000);
  };

  componentWillUnmount() {
    clearInterval(this.refresher);
  };

  fetchCars = () => {
    this.props.fetchCars(this.props.garage);
  };

  renderList() {
    return this.props.cars.map((car) => {
      return (
        <Link to={`/cars/${car.id}`} key={car.id}>
          <div className="car">
            <h3>{car.make} {car.model}</h3>
            <p><strong>Owner: </strong>{car.owner}</p>
          </div>
        </Link>
      );
    });
  };

  render() {
    return (
      <div className="main-container">
        <SidePanel garage={this.props.garage}>
          <Link to={'/cars/new'} className="black-button">
            Add a car
          </Link>
        </SidePanel>
        <div className="car-list">
            <ul ref={(list) => { this.list = list; }}>
              {this.props.cars.length > 0 ? this.renderList() : "No cars listed" }
            </ul>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    cars: state.cars,
    garage: state.garage
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCars }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CarsIndex);
