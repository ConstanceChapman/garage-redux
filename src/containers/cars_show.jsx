
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { fetchCar, removeCar } from '../actions/index';

import SidePanel from '../components/side_panel';

class CarsShow extends Component {
  handleClick = () => {
    this.props.removeCar(this.props.history, this.props.car);
  }

  componentDidMount() {
    if (!this.props.car) {
      this.props.fetchCar(this.props.match.params.id);
    }
  }

  render () {
    const car = this.props.car;
    if (!car) {
      return (
        <SidePanel key="SidePanel" garage={this.props.garage}>
          <Link to="/">Back to list</Link>
        </SidePanel>);
    }
    return (
      <div className="main-container">
        <SidePanel key="SidePanel" garage={this.props.garage}>
          <Link to="/" className="black-button">Back to list</Link>
        </SidePanel>
        <div className="car-show-card">
          <img src="../../assets/images/black.png" className="show-card-image"/>
          <div className="show-card-details">
            <h3>{car.brand} - {car.model}</h3>
            <p><strong>Owner:</strong> {car.owner}</p>
            <div className="plate">
              <h2>{car.plate}</h2>
            </div>
          </div>
          <div className="show-card-btn">
            <button className="delete" onClick={this.handleClick}>
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);
  return {
    car: state.cars.find((car) => car.id === id),
    garage: state.garage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, removeCar }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarsShow));
