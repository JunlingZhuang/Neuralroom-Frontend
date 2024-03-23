import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import MyGraph from "./MyGraph";
import { setDataInitPos } from "./myutils";
import * as d3 from "d3";

const GraphComponent = forwardRef(({ parentWidth, parentHeight }, ref) => {
  const myGraphRef = useRef(null);

  // 使用useImperativeHandle来暴露组件的方法
  useImperativeHandle(ref, () => ({
    sendGraph() {
      const graphDataTest = myGraphRef.current.sendGraphData();

      // 定义一个方法，比如更新图表等
      console.log("GraphComponent custom method called");
      return graphDataTest;
    },
  }));
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
    const loadData = async () => {
      try {
        // load node data
        const nodeResponse = await fetch("/sample_set/node.json");
        const nodes = await nodeResponse.json();

        // set up the margin and dimensions of the graph
        const margin = { top: 5, right: 5, bottom: 5, left: 5 };
        const width = parentWidth - margin.left - margin.right;
        const height = parentHeight - margin.top - margin.bottom;
        nodes.forEach((node) => (node.processed = false));
        const preparedNodes = setDataInitPos(nodes, width, height);

        // add program name and color to the nodes
        const dictResponse = await fetch("/dict/program_dict.json");
        const programData = await dictResponse.json();
        preparedNodes.forEach((node) => {
          const programInfo = programData[node.program];
          if (programInfo) {
            node.programName = programInfo.programName;
            node.color = programInfo.color;
          }
        });

        // load edge data
        const edgeResponse = await fetch("/sample_set/edge.json");
        const edges = await edgeResponse.json();

        // create the graph data object
        const graphData = { nodes: preparedNodes, edges: edges };

        // create the graph when the data is loaded
        if (svgRef.current) {
          myGraphRef.current = new MyGraph(
            graphData,
            svgRef.current,
            updateTooltip
          );
        }
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
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
});

export default GraphComponent;
