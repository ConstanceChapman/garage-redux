import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchCars } from '../actions/index';
import Car from '../components/car';
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
        <Car car={car} key={car.id} />
      );
    });
  };

  render() {
    return (
      <div className="main-container">
        <SidePanel garage={this.props.garage}/>
        <div className="car-list text-center">
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
