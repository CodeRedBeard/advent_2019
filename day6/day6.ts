import { TestCase, test } from "../util/test";

const testCases1: TestCase<string[], number>[] = [
  [['COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
  ], 42],
]

const testCases2: TestCase<string[], number>[] = [
  [['COM)B',
    'B)C',
    'C)D',
    'D)E',
    'E)F',
    'B)G',
    'G)H',
    'D)I',
    'E)J',
    'J)K',
    'K)L',
    'K)YOU',
    'I)SAN',
  ], 4],
]

interface TreeNode {
  name: string;
  parent: TreeNode | null;
  children: TreeNode[];
}

type Orbits = {
  tree: TreeNode;
  nodes: Map<string,TreeNode>;
}

function readOrbits(lines: string[]): Orbits {
  const nodes = new Map<string,TreeNode>();
  function getNode(name: string): TreeNode {
    let node = nodes.get(name);
    if (!node) {
      node = { name: name, children: [], parent: null };
      nodes.set(name, node);
    }
    return node;
  }
  const parents = new Map<string,string>();
  for (const line of lines) {
    const [p,c] = line.split(')');
    const parent = getNode(p);
    const child = getNode(c);
    child.parent = parent;
    parent.children.push(child);
    parents.set(c, p);
  }
  const root = Array.from(nodes.values()).find(x => x.parent === null);
  return {
    tree: root,
    nodes: nodes,
  };
}

// Breadth-first search for shortest path
function shortestPath(orbits: Orbits, startNode: TreeNode, endNode: TreeNode): TreeNode[] {
  const queue = [startNode];
  const visited = new Set<TreeNode>(queue);
  const pathParents = new Map<TreeNode,TreeNode>();
  while (queue.length > 0) {
    const next = queue.shift();
    if (next === endNode) {
      const path = [];
      for (let node = endNode; node; node = pathParents.get(node)) {
        path.push(node);
      }
      path.reverse();
      return path;
    }

    for (const link of [next.parent, ...next.children]) {
      if (!link) {
        continue;
      }
      if (visited.has(link)) {
        continue;
      }
      pathParents.set(link, next);
      visited.add(link);
      queue.push(link);
    }
  }

  return [];
}

function solvePart1(lines: string[]): number {
  // Count "direct and indirect orbits"
  const orbits = readOrbits(lines);

  let sum = 0;
  for (let item of orbits.nodes.keys()) {
    let node = orbits.nodes.get(item);
    while (true) {
      node = node.parent;
      if (!node) {
        break;
      }
      ++sum;
    }
  }
  return sum;
}

function solvePart2(lines: string[]): number {
  // Count "orbital transfers"
  const orbits = readOrbits(lines);

  const startNode = orbits.nodes.get('YOU').parent;
  const endNode = orbits.nodes.get('SAN').parent;
  const path = shortestPath(orbits, startNode, endNode);

  return path.length - 1;
}

export function run(lines: string[]) {
  test(solvePart1, testCases1);
  test(solvePart2, testCases2);

  const result_1 = solvePart1(lines);
  console.log(`Part1: ${result_1}`);

  const result_2 = solvePart2(lines);
  console.log(`Part2: ${result_2}`);
}