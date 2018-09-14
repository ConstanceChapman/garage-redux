import React from 'react';

const SidePanel = (props) => {
  return (
    <div className="side-panel">
      <img src="../../assets/images/man.png" className="side-panel-image"/>
      <div className="side-panel-logo">
        <img src="../../assets/images/red.png" className="logo"/>
      </div>
      <div className="side-panel-content">
        <h3>{props.garage}</h3>
        <p>Our garage was voted the best in the local area by our customers.
        We believe in excellent customer service and good quality repairs!
        Register your car with us today.</p>
      </div>
      <div className="side-panel-button">
        {props.children}
      </div>
    </div>
  );
};

export default SidePanel;
