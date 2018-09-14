import React from 'react';

const SidePanel = (props) => {
  return (
    <div className="side-panel">
      <h3>{props.garage}</h3>
      <p>Our garage was voted the best in the local area by our customers.
      We believe in excellent customer service and good quality repairs!
      Register your car with us today.</p>
      {props.children}
    </div>
  );
};

export default SidePanel;
