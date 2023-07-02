import minimist from "minimist";

main();

function main() {
  const argv = minimist(process.argv.slice(2));
  const today = new Date();
  const y = argv.y ? argv.y : today.getFullYear();
  const m = argv.m ? argv.m - 1 : today.getMonth();

  printHeader(y, m);
  printBody(y, m);
}

function printHeader(y, m) {
  console.log(`      ${m + 1}月 ${y}`);
  console.log("日 月 火 水 木 金 土");
}

function printBody(y, m) {
  printBlank(y, m);

  const lastDate = new Date(y, m + 1, 0).getDate();
  const SATURDAY = 6;
  for (let d = 1; d <= lastDate; d++) {
    process.stdout.write(d.toString().padStart(2));
    const day = new Date(y, m, d).getDay();
    if (day === SATURDAY) {
      console.log();
    } else {
      process.stdout.write(" ");
    }
  }
  process.stdout.write("\n\n");
}

function printBlank(y, m) {
  const firstDay = new Date(y, m, 1).getDay();
  process.stdout.write(" ".repeat(firstDay * 3));
}
