import { TestCase, test } from '../test';
import { notEmpty } from '../util';

let testCases1: TestCase<string[],number>[] = [
  [['R8,U5,L5,D3','U7,R6,D4,L4'], 6],
];

interface Cursor {
  x: number;
  y: number;
  d: number;
}
const dirMap = new Map<string, [number,number]>([
  ['L', [-1,0]],
  ['R', [+1,0]],
  ['D', [0,-1]],
  ['U', [0,+1]],
]);
function mapWire(wireDirs: string[]) {
  let pos: Cursor = {x:0, y:0, d:0};
  let map = new Map<string, Cursor>();
  for (const dir of wireDirs) {
    let [dx,dy] = dirMap.get(dir[0]);
    let dist = Number(dir.slice(1));
    for (let n = 0; n < dist; ++n) {
      let {x,y,d} = pos;
      x += dx;
      y += dy;
      ++d;
      pos = {x:x, y:y, d:d};
      let key = `${x},${y}`;
      if (!map.has(key)) {
        map.set(key, pos);        
      }
    }
  }
  return map;
}

function findIntersections(lines: string[]) {
  let wireDirs = lines.map(line => line.split(','));
  //console.log(wireDirs);
  let wireMaps = wireDirs.map(mapWire);
  let a = Array.from(wireMaps[0].keys());
  let b = Array.from(wireMaps[1].keys());
  let am = wireMaps[0];
  let bm = wireMaps[1];
  let poss = a.filter(k => bm.has(k))
    .map(k => {
      let pb = bm.get(k);
      let pa = am.get(k);
      return {
        x: pa.x,
        y: pa.y,
        d: pa.d + pb.d,
      };
    });
  return poss;
}

function closestHit(lines: string[]) {
  let poss = findIntersections(lines);
  let dists = poss.map(
    ({x,y}) => Math.abs(x) + Math.abs(y));
  let min = Math.min(9999, ...dists);
  return min;
}

function lowestSum(lines: string[]) {
  let poss = findIntersections(lines);
  let dists = poss.map((p) => p.d);
  let min = Math.min(99999, ...dists);
  return min;
}

export function run(lines: string[]) {
  test(closestHit, testCases1);

  lines = lines.filter(notEmpty);
  let result_1 = closestHit(lines);
  console.log(`Closest: ${result_1}`);

  let result_2 = lowestSum(lines);
  console.log(`Lowest: ${result_2}`);
}
