import fs from "fs";
import path from "path";

const input = fs.readFileSync(path.join(__dirname, "input.txt"), "utf8");
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const findCommonItem = (strings: string[]) => {
  return [
    ...new Set(
      [...strings[0]].filter((item) =>
        strings.slice(1).every((opt) => [...opt].includes(item))
      )
    ),
  ][0];
};

const getItemPriority = (item: string) => {
  const priority = alphabet.indexOf(item.toUpperCase()) + 1;

  return item.toLowerCase() === item ? priority : alphabet.length + priority;
};

const splitLinesIntoGroups = (lines: string[], groupSize: number) => {
  return lines.reduce<string[][]>((cValue, rucksack) => {
    // Get last array group
    const groupArr = cValue?.[cValue.length - 1];

    // Check if group exists and its size is lover than `groupSize`
    if (groupArr && groupArr.length < groupSize) groupArr.push(rucksack);
    // Create new group
    else cValue.push([rucksack]);

    // Return modified array of groups
    return cValue;
  }, []);
};

const p1 = (input: string) => {
  return input.split("\r\n").reduce((cValue, rucksack) => {
    const compSize = rucksack.length / 2;
    const commonItem = findCommonItem([
      rucksack.slice(0, compSize),
      rucksack.slice(compSize),
    ]);

    return cValue + getItemPriority(commonItem);
  }, 0);
};

const p2 = (input: string) => {
  const groups = splitLinesIntoGroups(input.split("\r\n"), 3);

  return groups.reduce((cValue, group) => {
    const commonItem = findCommonItem(group);
    return cValue + getItemPriority(commonItem);
  }, 0);
};

console.log(p1(input)); // 7826
console.log(p2(input)); // 2577
