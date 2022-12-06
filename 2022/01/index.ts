import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const splitIntoChunks = (input: string): number[] => {
  return input
    .split("\n\n")
    .map((chunk) => chunk.split("\n").reduce((a, b) => a + Number(b), 0));
};

export const p1 = (input: string) => {
  return Math.max(...splitIntoChunks(input));
};

export const p2 = (input: string) => {
  return splitIntoChunks(input)
    .sort()
    .splice(0, 3)
    .reduce((a, b) => a + b, 0);
};

console.log(p1(input)); // 71023

console.log(p2(input)); // 35907
