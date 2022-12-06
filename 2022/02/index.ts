import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

type Shape = "rock" | "paper" | "scissors";

enum Structure {
  HASHES,
  SHAPE,
  LOSING_SHAPE,
  AWARD,
}

enum Award {
  WIN = 6,
  DRAW = 3,
  DEFEAT = 0,
}

const shapes: [
  hashes: [string, string],
  shape: Shape,
  opponentShape: Shape,
  value: number
][] = [
  [["A", "X"], "rock", "scissors", 1],
  [["B", "Y"], "paper", "rock", 2],
  [["C", "Z"], "scissors", "paper", 3],
];

const encrypt = (hash: string) =>
  shapes.find(([hashes]) => hashes.includes(hash))!;

const getShapeDetails = (shape: Shape) =>
  shapes.find(([, shape_]) => shape === shape_)!;

const getOppositeShape = (shape: Shape) =>
  getShapeDetails(
    shapes.find(([, , shape_]) => shape === shape_)![Structure.SHAPE]
  );

const p1 = () => {
  return input.split("\n").reduce((cValue, row) => {
    const [x, y] = row.split(" ");

    const opponent = encrypt(x);
    const you = encrypt(y);

    // Draw
    if (opponent[Structure.SHAPE] === you[Structure.SHAPE]) {
      return cValue + you[Structure.AWARD] + Award.DRAW;
    } // You win
    else if (
      getShapeDetails(you[Structure.SHAPE])![Structure.LOSING_SHAPE] ===
      opponent[Structure.SHAPE]
    ) {
      return cValue + you[Structure.AWARD] + Award.WIN;
    }
    // Defeat
    return cValue + you[Structure.AWARD] + Award.DEFEAT;
  }, 0);
};

const p2 = () => {
  return input.split("\n").reduce((cValue, row) => {
    const [x, y] = row.split(" ");

    const opponent = encrypt(x);

    // Draw
    if (y === "Y") {
      return cValue + opponent[Structure.AWARD] + Award.DRAW;
    } // Win
    else if (y === "Z") {
      const winning = getOppositeShape(opponent[Structure.SHAPE]);

      return cValue + winning[Structure.AWARD] + Award.WIN;
    }
    // Defeat
    const losing = getShapeDetails(opponent[Structure.LOSING_SHAPE]);

    return cValue + losing[Structure.AWARD] + Award.DEFEAT;
  }, 0);
};

console.log(p1()); // 10595

console.log(p2()); // 9541
