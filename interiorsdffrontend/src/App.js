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
  const [modelUrl, setModelUrl] = useState("");
  const handleModelChange = (modelName) => {
    setModelUrl(`http://127.0.0.1:5000/models/${modelName}.fbx`);
  };

  // set the initial size of the input box
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
        <div class="d-flex justify-content-center">
          <h1>SDF TOP</h1>
        </div>
      </Row>
      <Row className="layout-row-middle">
        <Container className="input-output-container">
          <Row>
            <Col className="input-col-left" sm={6} md={6} lg={6} xl={6} xxl={6}>
              <Stack gap={3}>
                <div className="input-box-canvas shadow-sm p-2 mb-4 bg-body rounded h-75 d-block">
                  <InputBox boxSize={boxSize} />
                </div>
                <Stack gap={3} className="col-md-5 mx-auto">
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
            <Col
              className="output-col-right"
              sm={6}
              md={6}
              lg={6}
              xl={6}
              xxl={6}
            >
              <Stack gap={3}>
                <div className="output-box-canvas shadow-sm p-2 mb-4 bg-body rounded h-75 d-block">
                  <OutputBox modelUrl={modelUrl} />
                </div>
                <Stack gap={3} className="col-md-5 mx-auto ">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleModelChange("case1")}
                  >
                    Case1
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleModelChange("case2")}
                  >
                    Case2
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleModelChange("case3")}
                  >
                    Case3
                  </Button>
                </Stack>
              </Stack>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className="layout-row-bottom">
        <div class="d-flex justify-content-center">
          <h2>bottom</h2>
        </div>
      </Row>
    </Container>
  );
}

export default App;
