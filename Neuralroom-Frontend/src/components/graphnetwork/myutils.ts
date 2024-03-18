import * as d3 from "d3";

export declare interface Props {
  [key: string]: string | number;
}

export declare interface Node {
  index?: number;
  program?: string;
  initX?: number;
  initY?: number;
  properties?: Props;
  [key: string]: any;
}

export declare interface Edge {
  source: number | Node;
  target: number | Node;
  properties?: Props;
  [key: string]: any;
}

export declare interface Config {
  nodeDefaultProps: Props;
  edgeDefaultProps: Props;
}

export declare interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

// export function setDataInitPos(data: any[]) {
//   console.log(data);

//   for (let i = 0; i < data.length; i++) {
//     const svg = d3.select("svg");
//     const width = +svg.attr("width");
//     const height = +svg.attr("height");
//     data[i].nodes.forEach((d, j) => {
//       if (!d.processed) {
//         if (d.initX) {
//           d.initX = Math.floor(parseFloat(d.initX) * 40 + width / 2);
//           d.initY = Math.floor(parseFloat(d.initY) * 40 + height / 2);
//         } else {
//           const [x, y] = getCircXY(j, data[i].nodes.length, width, height);
//           d.initX = x;
//           d.initY = y;
//         }
//         d.x = d.initX;
//         d.y = d.initY;
//         d.index = j;
//         d.processed = true;
//       }
//     });
//   }
// }

// function getCircXY(i, length, w, h) {
//   const x = Math.floor(Math.cos((i / length) * 2 * Math.PI) * 100 + w / 2);
//   const y = Math.floor(Math.sin((i / length) * 2 * Math.PI) * 100 + h / 2);
//   return [x, y];
// }

export function setDataInitPos(data: any[], width: number, height: number) {
  const svg = d3.select("svg");

  data.forEach((node) => {
    if (!node.processed) {
      if (node.initX) {
        node.initX = Math.floor(parseFloat(node.initX) * 40 + width / 2);
        node.initY = Math.floor(parseFloat(node.initY) * 40 + height / 2);
      } else {
        const [x, y] = getCircXY(node.index, data.length, width, height);
        node.initX = x;
        node.initY = y;
      }
      //   node.x = node.initX;
      //   node.y = node.initY;
      node.processed = true;
    }
  });
  console.log(data);
  return data;
}

function getCircXY(
  index: number,
  total: number,
  width: number,
  height: number
) {
  // assign x and y coordinates to nodes
  const angle = (index / total) * 2 * Math.PI;
  const radius = (Math.min(width, height) / 2) * 0.8;
  const x = width / 2 + radius * Math.cos(angle);
  const y = height / 2 + radius * Math.sin(angle);
  return [x, y];
}
