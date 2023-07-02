import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const y = argv["y"];
const m = argv["m"];

let date = new Date(y, m - 1, 1);
let startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
let endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

function rjust(string, length) {
  return " ".repeat(length - string.length) + string;
}

console.log(
  `      ${rjust(date.getMonth() + 1, 2)}月 ${rjust(
    date.getFullYear(),
    4
  )}     `
);
console.log("日 月 火 水 木 金 土");
process.stdout.write(" ".repeat(startOfMonth.getDay() * 3));
for (let i = 1; i <= endOfMonth.getDate(); i++) {
  let day = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i);
  process.stdout.write(`${rjust(day.getDate().toString(), 2)} `);
  if (day.getDay() == 6) {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n\n");
