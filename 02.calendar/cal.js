import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const y = argv["y"];
const m = argv["m"];
const js_m = m - 1;

const date = new Date(y, js_m, 1);

console.log(`      ${m}月 ${y}`);
console.log("日 月 火 水 木 金 土");

const endOfMonth = new Date(y, js_m + 1, 0);
process.stdout.write(" ".repeat(date.getDay() * 3));
for (let i = 1; i <= endOfMonth.getDate(); i++) {
  process.stdout.write(`${i.toString().padStart(2)} `);
  const day = new Date(y, js_m, i);
  if (day.getDay() === 6) {
    process.stdout.write("\n");
  }
}
process.stdout.write("\n\n");
