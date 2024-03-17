import * as d3 from "d3";

export declare interface Props {
  [key: string]: string | number;
}

export declare interface Node{
    initX?:number;
    initY?:number;
    properties?:Props;
    [key:string]:any;
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

export function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function copy(obj: object) {
  return JSON.parse(JSON.stringify(obj));
}

export function setDataInitPos(data: any[]) {
  for (let i = 0; i < data.length; i++) {
    const svg = d3.select("svg");
    const width = +svg.attr("width");
    const height = +svg.attr("height");
    data[i].nodes.forEach((d, j) => {
      if (!d.processed) {
        if (d.initX) {
          d.initX = Math.floor(parseFloat(d.initX) * 40 + width / 2);
          d.initY = Math.floor(parseFloat(d.initY) * 40 + height / 2);
        } else {
          const [x, y] = getCircXY(j, data[i].nodes.length, width, height);
          d.initX = x;
          d.initY = y;
        }
        d.x = d.initX;
        d.y = d.initY;
        d.id = j;
        d.processed = true;
      }
    });
  }
}

function getCircXY(i, length, w, h) {
  const x = Math.floor(Math.cos((i / length) * 2 * Math.PI) * 100 + w / 2);
  const y = Math.floor(Math.sin((i / length) * 2 * Math.PI) * 100 + h / 2);
  return [x, y];
}

export function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}