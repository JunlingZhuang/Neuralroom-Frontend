import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RangeControl({ label, value, onChange }) {
  return (
    <Form.Group as={Row} className="align-items-center">
      <Col xs="auto">
        <Form.Label>{label}</Form.Label>
      </Col>
      <Col>
        <Form.Range value={value} onChange={onChange} />
      </Col>
    </Form.Group>
  );
}

export default RangeControl;
