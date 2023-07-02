import minimist from "minimist";

main();

function main() {
  const argv = minimist(process.argv.slice(2));
  const y = argv["y"];
  const m = argv["m"];

  const date = new Date(y, m - 1, 1);
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  console.log(`      ${date.getMonth() + 1}月 ${date.getFullYear()}`);
  console.log("日 月 火 水 木 金 土");
  process.stdout.write(" ".repeat(startOfMonth.getDay() * 3));
  for (let i = 1; i <= endOfMonth.getDate(); i++) {
    let day = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth(), i);
    process.stdout.write(`${day.getDate().toString().padStart(2)} `);
    if (day.getDay() == 6) {
      process.stdout.write("\n");
    }
  }
  process.stdout.write("\n\n");
}
