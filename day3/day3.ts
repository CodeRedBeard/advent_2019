import { TestCase, test } from '../test';
import { notEmpty } from '../util';

let testCases1: TestCase<string[],number>[] = [
  [['R8,U5,L5,D3','U7,R6,D4,L4'], 6],
];

interface Cursor {
  x: number;
  y: number;
}
const dirMap = new Map<string, [number,number]>([
  ['L', [-1,0]],
  ['R', [+1,0]],
  ['D', [0,-1]],
  ['U', [0,+1]],
]);
function mapWire(wireDirs: string[]) {
  let pos: Cursor = {x:0, y:0};
  let map = new Map<string, Cursor>();
  for (const dir of wireDirs) {
    let [dx,dy] = dirMap.get(dir[0]);
    let dist = Number(dir.slice(1));
    for (let n = 0; n < dist; ++n) {
      let {x,y} = pos;
      x += dx;
      y += dy;
      pos = {x:x, y:y};
      map.set(`${x},${y}`, pos);
    }
  }
  return map;
}

function closestHit(lines: string[]) {
  let wireDirs = lines.map(line => line.split(','));
  //console.log(wireDirs);
  let wireMaps = wireDirs.map(mapWire);
  let a = Array.from(wireMaps[0].keys());
  //console.log(a);
  let b = wireMaps[1];
  let matches = a.filter(x => b.has(x));
  //console.log(matches);
  let poss = matches.map(x => b.get(x));
  let dists = poss.map(
    ({x,y}) => Math.abs(x) + Math.abs(y));
  let min = Math.min(9999, ...dists);
  return min;
}

export function run(lines: string[]) {
  test(closestHit, testCases1);

  lines = lines.filter(notEmpty);
  let result_1 = closestHit(lines);
  console.log(`Closest: ${result_1}`);
}
