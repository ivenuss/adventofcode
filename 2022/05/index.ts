import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");

const parseDrawing = (input: string) => {
  return input
    .split("\r\n")
    .slice(0, -1)
    .map((row) => [...row].filter((_, i) => (i - 1) % 4 === 0))
    .reduce<string[][]>((cValue, charRow, columnId) => {
      charRow.forEach((char, i) => {
        if (!columnId) cValue.push([]);
        if (char !== " ") cValue[i].push(char);
      });

      return cValue;
    }, []);
};

const parseInstructions = (input: string) => {
  return input
    .split("\r\n")
    .map((row) => row.match(/\d+/g)!.map(Number) as [number, number, number]);
};

const moveCrates = (input: string, reverseOrder: boolean) => {
  const [drawingStr, instructionsStr] = input.split("\r\n\r\n");
  const drawing = parseDrawing(drawingStr);
  const instructions = parseInstructions(instructionsStr);

  return instructions
    .reduce(
      (cValue, instruction) => {
        const [amount, from, to] = instruction;

        const items = cValue[from - 1].splice(0, amount); // Remove items from array

        cValue[to - 1].unshift(...(reverseOrder ? items.reverse() : items)); // Add items to new array

        return cValue;
      },
      [...drawing]
    )
    .reduce((cValue, arr) => (cValue += arr[0]), "");
};

const p1 = (input: string) => moveCrates(input, true);

const p2 = (input: string) => moveCrates(input, false);

console.log(p1(input)); // JRVNHHCSJ

console.log(p2(input)); // GNFBSBJLH
