import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import GraphNetwork from "./components/graphnetwork.js";
import InputBox from "./components/inputbox.js";
import OutputBox from "./components/outputbox.js";
import RangeControl from "./components/rangecontrol.js";
import ResizeObserver from "resize-observer-polyfill";

function App() {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  // 使用 ResizeObserver 监听容器尺寸变化
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setContainerSize({ width, height });
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef]); 

  const [modelData, setModelData] = useState("");

  const handleModelDownload = async () => {
    try {
      const response = await fetch("http://localhost:5000/generate");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json(); 
      setModelData(data.model_data); 
    } catch (error) {
      console.error("Error fetching model:", error);
    }
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
                <div
                  ref={containerRef}
                  className="input-box-canvas shadow-sm p-2 mb-4 bg-body rounded h-25 d-block"
                >
                  <GraphNetwork
                    parentWidth={containerSize.width}
                    parentHeight={containerSize.height}
                  />
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
                  <OutputBox modelData={modelData} />
                </div>
                <Stack gap={3} className="col-md-5 mx-auto ">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleModelDownload}
                  >
                    Case1
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleModelDownload}
                  >
                    Case2
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleModelDownload}
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
