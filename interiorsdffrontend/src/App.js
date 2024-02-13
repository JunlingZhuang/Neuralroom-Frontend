import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import Stack from "react-bootstrap/Stack";

import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Canvas } from "@react-three/fiber";

import InputBox from "./components/inputbox.js";
import OutputBox from "./components/outputbox.js";
import RangeControl from "./components/rangecontrol.js";

function App() {
  const [boxSize, setBoxSize] = useState({ x: 1, y: 1, z: 1 });

  const handleSizeChangeX = (newValue) => {
    setBoxSize((prevSize) => ({ ...prevSize, x: newValue }));
  };

  const handleSizeChangeY = (newValue) => {
    setBoxSize((prevSize) => ({ ...prevSize, y: newValue }));
  };
  const handleSizeChangeZ = (newValue) => {
    setBoxSize((prevSize) => ({ ...prevSize, z: newValue }));
  };

  return (
    // <div className="App">
    //   <header className="App-header"></header>
    <Container fluid className="main-layout">
      <Row className="layout-row-top">
        <h1>SDF TOP</h1>
      </Row>
      <Row className="layout-row-middle">
        <Container className="input-output-container">
          <Row>
            <Col className="input-col-left" md={6} lg={6} xl={6} xxl={6}>
              <Stack gap={3}>
                <div className="input-box-canvas">
                  <InputBox boxSize={boxSize} />
                </div>
                <Stack gap={3} className="input-control-container">
                  <RangeControl
                    label="Long"
                    value={boxSize.x}
                    onChange={(e) => handleSizeChangeX(e.target.value)}
                  />
                  <RangeControl
                    label="Height"
                    value={boxSize.y}
                    onChange={(e) => handleSizeChangeY(e.target.value)}
                  />
                  <RangeControl
                    label="Width"
                    value={boxSize.z}
                    onChange={(e) => handleSizeChangeZ(e.target.value)}
                  />
                </Stack>
              </Stack>
            </Col>
            <Col className="output-col-right" md={6} lg={6} xl={6} xxl={6}>
              <Stack gap={3}>
                <div className="output-box-canvas">
                  <OutputBox boxSize={boxSize} />
                </div>
                <Stack gap={3} className="output-control-container">
                  <Button variant="primary">Case1</Button>
                  <Button variant="primary">Case2</Button>
                  <Button variant="primary">Case3</Button>
                </Stack>
              </Stack>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className="layout-row-bottom">
        <h1>Bottom</h1>
      </Row>
    </Container>
  );
}

export default App;
