import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "../styles/rangecontrol.css";

function RangeControl({ label, value, onChange }) {
  return (
    <Form.Group as={Row} className="align-items-center">
      <Col xs="3">
        <Form.Label>{label}</Form.Label>
      </Col>
      <Col>
        <Form.Range
          className="custom-range"
          value={value}
          onChange={onChange}
        />
      </Col>
    </Form.Group>
  );
}

export default RangeControl;
