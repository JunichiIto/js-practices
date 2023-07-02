import enquirer from "enquirer";
import minimist from "minimist";
import { promises as fs } from "fs";
import sqlite3 from "sqlite3";

class App {
  constructor() {
    this.storage = new MemoStorage();
  }

  run() {
    const argv = minimist(process.argv.slice(2));
    if (argv.init) {
      this.storage.createTable();
    } else if (argv.l) {
      this.#doList();
    } else if (argv.r) {
      this.#doRead();
    } else if (argv.d) {
      this.#doDelete();
    } else {
      this.#doInsert();
    }
  }

  // #で始まるメソッドはprivateメソッド
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields
  async #doList() {
    const memos = await this.storage.all();
    memos.forEach((memo) => console.log(memo.title));
  }

  async #doRead() {
    const prompt = new enquirer.Select({
      message: "Choose a note you want to see:",
      choices: this.#buildChoices(),
    });
    const id = await prompt.run();
    const memo = await this.storage.find(id);
    console.log(memo.body);
  }

  async #doDelete() {
    const prompt = new enquirer.Select({
      message: "Choose a note you want to delete:",
      choices: this.#buildChoices(),
    });
    const id = await prompt.run();
    this.storage.delete(id);
  }

  async #doInsert() {
    const input = await fs.readFile("/dev/stdin", "utf8");
    const memo = new Memo({ body: input });
    this.storage.insert(memo);
  }

  async #buildChoices() {
    const memos = await this.storage.all();
    return memos.map(({ id, title }) => ({ message: title, value: id }));
  }
}

class Memo {
  constructor({ id, body }) {
    this.id = id;
    this.body = body;
  }

  get title() {
    return this.body.split("\n")[0];
  }
}

class MemoStorage {
  constructor() {
    this.db = new sqlite3.Database("memo.db");
  }

  createTable() {
    const ddl =
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, body TEXT NOT NULL)";
    this.db.run(ddl);
  }

  insert(memo) {
    const sql = "INSERT INTO memos (body) VALUES (?)";
    this.db.run(sql, memo.body);
  }

  delete(id) {
    const sql = "DELETE FROM memos WHERE id = ?";
    this.db.run(sql, id);
  }

  all() {
    const sql = "SELECT id, body FROM memos ORDER BY id";
    return new Promise((resolve) => {
      this.db.all(sql, (err, rows) => {
        if (err) throw err;
        const memos = rows.map((row) => new Memo(row));
        resolve(memos);
      });
    });
  }

  find(id) {
    const sql = "SELECT id, body FROM memos WHERE id = ?";
    return new Promise((resolve) => {
      this.db.get(sql, id, (err, row) => {
        if (err) throw err;
        resolve(new Memo(row));
      });
    });
  }
}

new App().run();
