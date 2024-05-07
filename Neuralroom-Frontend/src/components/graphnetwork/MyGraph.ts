// Graph.ts
import * as d3 from "d3";
import { GraphData, Node, Edge } from "./myutils";

class MyGraph {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private nodes: any;
  // private simulation: any;
  private simulation: any;

  // private nodes: d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>;
  // private edges: d3.Selection<SVGLineElement, Edge, SVGSVGElement, unknown>;
  private edges: any;
  private updateTooltip: (
    visible: boolean,
    content: string,
    x: number,
    y: number
  ) => void;

  //   private origData: GraphData;
  //   private simulation: d3.Simulation<d3.SimulationNodeDatum, undefined>;

  constructor(
    private graphData: GraphData,
    svgElement: SVGSVGElement,
    updateTooltip: (
      visible: boolean,
      content: string,
      x: number,
      y: number
    ) => void
  ) {
    this.updateTooltip = updateTooltip;
    this.svg = d3.select(svgElement);
    this.nodes = this.svg.selectAll(".node").data(this.graphData.nodes);
    this.syncIndexofEdgewithNodes();
    // select edges after attaching nodes to edges
    this.edges = this.svg.selectAll(".edge").data(this.graphData.edges);

    this.initializeGraph();
    this.initializeSimulation();
  }

  // send graph data to parent component
  sendGraphData() {
    const graphData = {
      nodes: this.graphData.nodes.map((node) => ({ ...node })),
      edges: this.graphData.edges.map((edge) => ({ ...edge })),
    };
    console.log("Sending data from MyGraph:", graphData);
    return graphData;
  }
  private initializeGraph(): void {
    this.renderEdges();
    this.renderNodes();
  }
  private syncIndexofEdgewithNodes(): void {
    this.graphData.edges.forEach((edge) => {
      if (typeof edge.source === "number") {
        edge.sourceNode = this.graphData.nodes.find(
          (node) => node.index === edge.source
        );
      }
      if (typeof edge.target === "number") {
        edge.targetNode = this.graphData.nodes.find(
          (node) => node.index === edge.target
        );
      }
    });
  }
  private initializeSimulation(): void {
    // Define the simulation with forces
    this.simulation = d3
      .forceSimulation(this.graphData.nodes)
      .force(
        "link",
        d3
          .forceLink(this.graphData.edges)
          .id((d: any) => d.index) // Assuming each node has a unique 'index' property
          .distance(100) // You can adjust this value
      )
      .force("charge", d3.forceManyBody().strength(-200)) // Adjust the strength to achieve the desired spacing
      .force(
        "center",
        d3.forceCenter(
          this.svg.node().clientWidth / 2,
          this.svg.node().clientHeight / 2
        )
      );

    // Apply forces to nodes and update positions
    this.simulation.on("tick", () => {
      this.nodes.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
      this.edges
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
    });
  }
  private renderNodes(): void {
    this.nodes
      .join("circle")
      .classed("node", true)
      .attr("r", 10)
      .attr("cx", (d) => d.initX ?? 0)
      .attr("cy", (d) => d.initY ?? 0)
      .style("stroke", "white")
      .style("stroke-width", 2)
      .style("fill", (d) => d.color)
      .on("mouseover", (event, d) => {
        this.updateTooltip(
          true,
          `Program: ${d.programName}`,
          event.pageX + 5,
          event.pageY - 28
        );
        d3.select(event.currentTarget).style("fill", d.color);
      })
      .on("mousemove", (event, d) => {
        this.updateTooltip(
          true,
          `Program: ${d.programName}`,
          event.pageX + 5,
          event.pageY - 28
        );
      })
      .on("mouseout", (event, d) => {
        this.updateTooltip(false, "", 0, 0);

        d3.select(event.currentTarget).style("fill", d.color);
      });
  }

  private renderEdges(): void {
    this.edges
      .join("line")
      .classed("edge", true)
      .attr("x1", (d) => d.sourceNode?.initX ?? 0)
      .attr("y1", (d) => d.sourceNode?.initY ?? 0)
      .attr("x2", (d) => d.targetNode?.initX ?? 0)
      .attr("y2", (d) => d.targetNode?.initY ?? 0)
      .style("stroke", "white")
      .style("stroke-width", 1);
  }
}

export default MyGraph;
