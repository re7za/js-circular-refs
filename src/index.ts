import { TAnyObj } from "./types";
import decycle from "./utils/decycle";
import retrieve from "./utils/retrieve";

const a: TAnyObj = { wubba: ["lubba", "dab", "dab"] };
const b: TAnyObj = { hello: "world" };

b.a = a;
a.b = b;

const original = b;
console.log("original:", original);

const decycled = decycle(original, { refIdLength: 5 });
console.log("decycled:", decycled);

const retrieved = retrieve(decycled, { modifyObj: false });
console.log("retrived:", retrieved.a.b.a.b.a.b.a.b.a.b);
