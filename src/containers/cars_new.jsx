import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { createCar } from '../actions';


class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(values, this.props.garage, (car) => {
      this.props.history.push('/'); // Navigate after submit
      return car;
    });
  }

  renderField(field) {
    return (
      <div className="form-group">
        <label>{field.label}</label>
        <input
          className="form-control"
          type={field.type}
          {...field.input}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="main-container">
        <div className="car-form">
          <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
            <Field
              label="Brand"
              name="brand"
              type="text"
              component={this.renderField}
            />
            <Field
              label="Model"
              name="model"
              type="text"
              component={this.renderField}
            />
            <Field
              label="Owner"
              name="owner"
              type="text"
              component={this.renderField}
            />
            <Field
              label="Plate"
              name="plate"
              type="text"
              component={this.renderField}
            />
            <button className="btn btn-primary" type="submit"
            disabled={this.props.pristine || this.props.submitting}>
              Create Car
            </button>
          </form>
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

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchCars }, dispatch);
// }

export default reduxForm({
  form: 'newCarForm' // a unique identifier
})(
  connect(mapStateToProps, { createCar })(CarsNew)
);
