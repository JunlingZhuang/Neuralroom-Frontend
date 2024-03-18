// Graph.ts
import * as d3 from "d3";
import { GraphData, Node } from "./myutils"; // 假设这是你的接口定义文件

class MyGraph {
  private svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private nodes: d3.Selection<SVGCircleElement, Node, SVGGElement, unknown>; // 存储节点的选择集
  private updateTooltip: (
    visible: boolean,
    content: string,
    x: number,
    y: number
  ) => void;

  //   private edges: d3.Selection<SVGLineElement, Edge, SVGSVGElement, unknown>;
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
    this.nodes = this.svg.selectAll(".node");
    this.initializeGraph();
  }
  private initializeGraph(): void {
    this.renderNodes();
  }


  private renderNodes(): void {
    this.nodes = this.nodes
      .data(this.graphData.nodes)
      .join("circle")
      .classed("node", true)
      .attr("r", 30) 
      .attr("cx", (d) => d.initX ?? 0) 
      .attr("cy", (d) => d.initY ?? 0) 
      .style("stroke", "black") 
      .style("fill", "white") 
      .on("mouseover", (event, d) => {
        console.log("mousemove data:", d.program);

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
      .on("mouseout", (event) => {
        this.updateTooltip(false, "", 0, 0);

        d3.select(event.currentTarget).style("fill", "white");
      });
  }

  //   private renderEdges(): void {
  //   }
}

export default MyGraph;
