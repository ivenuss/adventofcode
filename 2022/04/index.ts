import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const contains = (range1: number[], range2: number[]) => {
  const [first1, last1] = range1;
  const [first2, last2] = range2;
  return (
    (first1 <= first2 && last1 >= last2) || (first2 <= first1 && last2 >= last1)
  );
};

const overlaps = (range1: number[], range2: number[]) => {
  const [first1, last1] = range1;
  const [first2, last2] = range2;
  return first1 <= last2 && last1 >= first2;
};

const p1 = (input: string) => {
  return input
    .split("\r\n")
    .map((pair) => pair.split(",").map((p) => p.split("-").map(Number)))
    .filter((pair) => contains(pair[0], pair[1])).length;
};

const p2 = (input: string) => {
  return input
    .split("\r\n")
    .map((pair) => pair.split(",").map((p) => p.split("-").map(Number)))
    .filter((pair) => overlaps(pair[0], pair[1])).length;
};

console.log(p1(input)); // 498

console.log(p2(input)); // 859
