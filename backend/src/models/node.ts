export class RecipeNode {
  value: any;
  neighbors: RecipeNode[];

  constructor(value: any) {
    this.value = value;
    this.neighbors = [];
  }

  addNeighbor(node: RecipeNode) {
    this.neighbors.push(node);
  }
}
