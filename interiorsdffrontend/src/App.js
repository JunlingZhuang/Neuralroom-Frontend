import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React from "react";
import Stack from "react-bootstrap/Stack";

import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Canvas } from "@react-three/fiber";

import InputBox from "./components/inputbox.js";

function App() {
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
                <InputBox />
                <Container className="size-button-container">Second item</Container>
              </Stack>
            </Col>
            <Col className="output-col-right" md={6} lg={6} xl={6} xxl={6}>
              output
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
