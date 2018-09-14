
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
          <Link to="/">Back to list</Link>
        </SidePanel>
        <div className="car">
          <h3>{car.brand} - {car.model}</h3>
          <p><strong>Owner:</strong> {car.owner}</p>
          <h3 className="plate">{car.plate}</h3>
          <button className="delete" onClick={this.handleClick}>
            <i className="fa fa-trash-o" aria-hidden="true"></i>
            Delete
          </button>
        </div>
      </div>
    );
  }
};

function mapStateToProps(state, ownProps) {
  const id = parseInt(ownProps.match.params.id);
  return {
    car: state.cars.find((car) => car.id === id),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCar, removeCar }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CarsShow));
