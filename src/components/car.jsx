import React from 'react';

const Car = (props) => {
  return (
    <div className="car">
      <h4>{props.car.brand} - {props.car.model}</h4>
      <p><strong>Owner: </strong>{props.car.owner}</p>
    </div>
  );
};

export default Car;
