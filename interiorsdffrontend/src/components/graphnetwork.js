import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const GraphNetwork = ({ parentWidth, parentHeight }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
    const width = parentWidth - margin.left - margin.right;
    const height = parentHeight - margin.top - margin.bottom;

    // 清除之前的 SVG 内容
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", parentWidth)
      .attr("height", parentHeight)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // 创建四个节点
    const nodes = [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }];

    const links = [
      { source: "A", target: "B" },
      { source: "A", target: "C" },
      { source: "B", target: "D" },
      { source: "C", target: "D" },
    ];

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id)
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .selectAll("path.link")
      .data(links)
      .enter()
      .append("path")
      .attr("stroke", "black")
      .style("fill", "none");

    const node = svg
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("circle")
      .attr("class", "node")
      .attr("r", 10)
      .style("fill", "white")
      .style("stroke", "black");

    simulation.on("tick", () => {
      link.attr("d", (d) => {
        return `M${d.source.x},${d.source.y}L${d.target.x},${d.target.y}`;
      });

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
    });
  }, [parentWidth, parentHeight]);

  return <div className="graph-network" ref={svgRef}></div>;
};

export default GraphNetwork;
