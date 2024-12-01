import { RecipeNode } from "./node";

class Graph {
    nodes: RecipeNode[];
  
    constructor() {
      this.nodes = [];
    }
  
    addNode(value: any) {
      const node = new RecipeNode(value);
      this.nodes.push(node);
    }
  
    addEdge(source: RecipeNode, destination: RecipeNode) {
      source.addNeighbor(destination);
      destination.addNeighbor(source);
    }
  }
  