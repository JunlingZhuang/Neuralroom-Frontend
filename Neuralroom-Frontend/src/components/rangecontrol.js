import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

// Assuming your custom CSS is necessary for additional styling
import "../styles/rangecontrol.css";

function RangeControl({ label, value, onChange }) {
  return (
    <Form>
      <Form.Group as={Row}>
        <Form.Label column sm="4">
          {label}
        </Form.Label>
        <Col sm="8">
          <RangeSlider value={value} onChange={onChange} min={0} max={10} />
        </Col>
      </Form.Group>
    </Form>
  );
}

export default RangeControl;
