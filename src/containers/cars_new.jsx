import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { createCar } from '../actions';
import { Link } from 'react-router-dom';
import SidePanel from '../components/side_panel';

const REQUIRED = value => value ? undefined : 'Required';
const ALPHANUMERIC = (value) => {
  return value && /[A-Z0-9]*-[A-Z0-9]*/.test(value) ? undefined : 'Invalid Licence Plate';
};

class CarsNew extends Component {
  onSubmit = (values) => {
    this.props.createCar(values, this.props.garage, (car) => {
      this.props.history.push('/'); // Navigate after submit
      return car;
    });
  }

  renderField({ input, label, type, meta: { touched, error, warning }}) {
    return (
      <div className="form-group">
        <label>{label}</label>
        <input
          className="form-control"
          type={type}
          {...input}
        />
        {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    );
  };

  render() {
    return (
      <div className="main-container">
        <SidePanel garage={this.props.garage}>
          <Link to={'/'} className="black-button">
            Back to list
          </Link>
        </SidePanel>
        <div className="car-form">
          <div className="form-container">
            <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
              <Field
                label="Brand"
                name="brand"
                type="text"
                validate={[REQUIRED]}
                component={this.renderField}
                placeholder="Ford"
              />
              <Field
                label="Model"
                name="model"
                type="text"
                validate={[REQUIRED]}
                component={this.renderField}
                placeholder="Mustang"
              />
              <Field
                label="Owner"
                name="owner"
                type="text"
                validate={[REQUIRED]}
                component={this.renderField}
                placeholder="John Smith"
              />
              <Field
                label="Plate"
                name="plate"
                type="text"
                validate={[ALPHANUMERIC]}
                component={this.renderField}
                placeholder="123ABC"
              />
              <button className="black-button wide" type="submit"
              disabled={this.props.pristine || this.props.invalid}>
                Create Car
              </button>
            </form>
          </div>
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
