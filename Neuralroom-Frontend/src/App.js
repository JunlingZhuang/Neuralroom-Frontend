import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useRef, useState, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import GraphNetwork from "./components/graphnetwork.js";
import GraphComponent from "./components/graphnetwork/GraphComponent.jsx";
import InputBox from "./components/inputbox.js";
import OutputBox from "./components/outputbox.js";
import RangeControl from "./components/rangecontrol.js";
import ResizeObserver from "resize-observer-polyfill";
import MyButton from "./components/mybutton.tsx";

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
      // 创建请求体，包含XYZ值
      const requestBody = {
        length: boxSize.length,
        height: boxSize.height,
        width: boxSize.width,
      };

      // 发送请求到后端
      const response = await fetch("http://localhost:5000/generate", {
        method: "POST", // 假设使用POST方法发送数据
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // 将请求体转换为JSON字符串
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // 处理响应数据
      const data = await response.json();
      // TO BE DONE: better replace it with some check
      //  TO BE DONE: await fetching the data.model_data
      console.log(data);
      setModelData(data.model_data);
      setShouldRenderModel(true);
    } catch (error) {
      console.error("Error fetching model:", error);
    }
  };

  // set the initial size of the input box
  const [boxSize, setBoxSize] = useState({ length: 1, height: 1, width: 1 });
  const [shouldRenderModel, setShouldRenderModel] = useState(false);
  // 当RangeControl变化时，更新boxSize，并重置shouldRenderModel为false
  const handleSizeChange = (dimension, newValue) => {
    setBoxSize((prevSize) => ({ ...prevSize, [dimension]: newValue }));
    setShouldRenderModel(false); // 重置标志，以便渲染立方体
  };

  return (
    <Container fluid className="main-layout">
      <Row className="layout-row-top">
        <div class="d-flex justify-content-center">
          <h1>Neural Room</h1>
        </div>
      </Row>
      <Row className="layout-row-middle">
        <Container className="input-output-container">
          <Row>
            <Col className="input-col-left" sm={6} md={6} lg={6} xl={6} xxl={6}>
              <Stack gap={3}>
                {/* <div className="input-box-canvas shadow-sm p-2 mb-4 bg-body rounded h-75 d-block">
                  <InputBox boxSize={boxSize} />
                </div> */}
                <div
                  ref={containerRef}
                  className="input-box-canvas shadow-sm p-2 mb-4 bg-body rounded h-75 d-block"
                >
                  <GraphComponent
                    parentWidth={containerSize.width}
                    parentHeight={containerSize.height}
                  />
                </div>
                <Stack gap={3} className="col-md-5 mx-auto"></Stack>
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
                  <OutputBox
                    modelData={shouldRenderModel ? modelData : null}
                    boxSize={!shouldRenderModel ? boxSize : null}
                    shouldRenderModel={shouldRenderModel}
                  />
                </div>
                <Stack gap={3} className="col-md-5 mx-auto ">
                  <RangeControl
                    label="length"
                    value={boxSize.length}
                    onChange={(e) => handleSizeChange("length", e.target.value)}
                  />
                  <RangeControl
                    label="Height"
                    value={boxSize.height}
                    onChange={(e) => handleSizeChange("height", e.target.value)}
                  />
                  <RangeControl
                    label="Width"
                    value={boxSize.width}
                    onChange={(e) => handleSizeChange("width", e.target.value)}
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={handleModelDownload}
                  >
                    Generate
                  </Button>
                  <MyButton title="I'm a disabled button" disabled={true} />
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
