// 在GraphComponent.jsx中
import React, { useState, useEffect, useRef } from "react";
import MyGraph from "./MyGraph";
import { setDataInitPos } from "./myutils";
import * as d3 from "d3";

const GraphComponent = ({ parentWidth, parentHeight }) => {
  const svgRef = useRef(null);
  //set up state for tooltip
  const [tooltip, setTooltip] = useState({
    visible: false,
    content: "",
    x: 0,
    y: 0,
  });
  const updateTooltip = (visible, content, x, y) => {
    setTooltip({ visible, content, x, y });
  };

  useEffect(() => {
    // load data
    fetch("/sample_set/node.json")
      .then((response) => response.json())
      .then((nodes) => {
        const margin = { top: 5, right: 5, bottom: 5, left: 5 };
        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;
        nodes.forEach((node) => (node.processed = false));

        const preparedNodes = setDataInitPos(nodes, width, height);
        const graphData = { nodes: preparedNodes, edges: [] };

        // Fetch program color and name data from dict
        fetch("/dict/program_dict.json")
          .then((response) => response.json())
          .then((programData) => {
            // Merge program data into node objects
            graphData.nodes.forEach((node) => {
              const programInfo = programData[node.program];
              if (programInfo) {
                node.programName = programInfo.programName;
                node.color = programInfo.color;
              }
            });
            console.log(graphData);
            // Create the graph with updated node data
            if (svgRef.current) {
              new MyGraph(graphData, svgRef.current, updateTooltip);
            }
          })
          .catch((error) => {
            console.error("Error loading program data:", error);
          });
      })
      .catch((error) => {
        console.error("Error loading node data:", error);
      });
  }, [parentWidth, parentHeight, setTooltip]);

  return (
    <>
      <svg
        className="graph-network"
        ref={svgRef}
        width={parentWidth}
        height={parentHeight}
      />
      {tooltip.visible && (
        <div
          style={{
            position: "absolute",
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: "lightgray",
            border: "1px solid",
            padding: "8px",
            pointerEvents: "none",
            visibility: tooltip.visible ? "visible" : "hidden",
            transform: "translate(-50%, -100%)",
          }}
        >
          {tooltip.content}
        </div>
      )}
    </>
  );
};

export default GraphComponent;
