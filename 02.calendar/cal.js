import minimist from "minimist";

const argv = minimist(process.argv.slice(2));
const y = argv["y"];
const m = argv["m"];

console.log(`      ${m}月 ${y}`);
console.log("日 月 火 水 木 金 土");

const js_m = m - 1;
const firstDay = new Date(y, js_m, 1).getDay();
process.stdout.write(" ".repeat(firstDay * 3));
const lastDate = new Date(y, js_m + 1, 0).getDate();
const SATURDAY = 6;
for (let i = 1; i <= lastDate; i++) {
  process.stdout.write(i.toString().padStart(2));
  const day = new Date(y, js_m, i).getDay();
  if (day === SATURDAY) {
    console.log();
  } else {
    process.stdout.write(" ");
  }
}
process.stdout.write("\n\n");
