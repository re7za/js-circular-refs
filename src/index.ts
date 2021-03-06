import { TAnyObj } from "./types";
import decycle from "./utils/decycle";
import retrieve from "./utils/retrieve";

const a: TAnyObj = { name: "hello" };
const b: TAnyObj = { fami: "world" };

a.b = b;
b.a = a;
b.b = b;
a.a = a;

const original = a;
console.log("A (original):", a);

const decycled = decycle(a, true);
console.log("A (decycled):", a);

const retrieved = retrieve(a, true);
console.log("A (retrived):", a);

console.log("original === decycled ===", original === decycled);
console.log("decycled === retrieved ===", decycled === retrieved);
